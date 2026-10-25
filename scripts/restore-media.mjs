import { existsSync, readdirSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname, sep } from 'node:path';
const root = resolve('.');
const publicRoot = resolve('public');
let restored=0, skipped=0;
for (const folder of ['media/images','media/videos']) {
 const absolute = resolve(folder);
 if (!existsSync(absolute)) continue;
 for (const filename of readdirSync(absolute).filter(x=>x.endsWith('.jsonl')).sort()) {
  const lines = readFileSync(resolve(absolute,filename),'utf8').split(/\r?\n/).filter(Boolean);
  for (const line of lines) {
   const {path,base64}=JSON.parse(line);
   if (typeof path!=='string'||typeof base64!=='string') throw new Error('Invalid media record');
   const target=resolve(path);
   if (!target.startsWith(publicRoot+sep)) throw new Error('Invalid destination: '+path);
   if (existsSync(target)) {skipped++;continue;}
   mkdirSync(dirname(target),{recursive:true});
   writeFileSync(target,Buffer.from(base64,'base64'));
   restored++;
  }
 }
}
console.log('Portfolio media: '+restored+' restored; '+skipped+' already present.');
