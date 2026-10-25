import { createReadStream, createWriteStream, existsSync, mkdirSync, renameSync, rmSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { finished } from 'node:stream/promises';

const root = process.cwd();
const assets = [
  { slug: 'baby-nest', parts: 27, size: 39403285, sha256: 'bd233213002e7d26b7adf60ba0b94c0b624f69c1eba1ac086e1c9f7cf67c6540' },
  { slug: 'reclaim', parts: 12, size: 17032138, sha256: '04d64cc63d3d1f6148bc8bb38d3b68a37c5cb13b30f774386e2cfffb76ed1dc0' },
  { slug: 'yenebet', parts: 37, size: 55263284, sha256: 'ba16c027ba6ff1097d4660517202397efff174897d7c0a8c99582eff3f3f64ea' }
];

async function sha256(file) {
  const h=createHash('sha256');
  const input=createReadStream(file);
  for await (const data of input) h.update(data);
  return h.digest('hex');
}
async function restore(a) {
  const destination=join(root,'public','projects',a.slug,'preview-4k.mp4');
  if (existsSync(destination) && statSync(destination).size===a.size && await sha256(destination)===a.sha256) return;
  const parts=Array.from({length:a.parts},(_,i)=>join(root,'media-4k','chunks',a.slug,'part-'+String(i+1).padStart(3,'0')+'.bin'));
  if(parts.some(p=>!existsSync(p))) {
    console.warn('Optional 4K chunks not all available for '+a.slug+'; Full HD preview remains usable.');
    return;
  }
  mkdirSync(dirname(destination),{recursive:true});
  const tmp=destination+'.assembling';
  const target=createWriteStream(tmp);
  try {
    for (const file of parts) {
      await new Promise((resolve,reject)=>{
        const stream=createReadStream(file);
        stream.on('error',reject);
        stream.on('end',resolve);
        stream.pipe(target,{end:false});
      });
    }
    target.end();await finished(target);
    if (statSync(tmp).size!==a.size || await sha256(tmp)!==a.sha256) throw new Error('Video verification failed: '+a.slug);
    renameSync(tmp,destination);
    console.log('Restored 4K-upscaled preview:',a.slug);
  } catch(e){
    target.destroy();rmSync(tmp,{force:true});throw e;
  }
}
for (const asset of assets) await restore(asset);
