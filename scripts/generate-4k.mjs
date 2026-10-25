import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
for (const slug of ['baby-nest','reclaim','yenebet']) {
 const input='public/projects/'+slug+'/preview.mp4';
 const output='public/projects/'+slug+'/preview-4k.mp4';
 if(!existsSync(input)) throw new Error('Missing project preview: '+input+'. Run npm install first.');
 if(existsSync(output)){console.log('Already exists:',output);continue;}
 mkdirSync(dirname(output),{recursive:true});
 const args=['-hide_banner','-loglevel','error','-y','-i',input,
 '-vf','scale=3840:2160:flags=lanczos','-c:v','libx264','-preset','fast',
 '-crf','22','-pix_fmt','yuv420p','-movflags','+faststart','-an','-threads','2',output];
 console.log('Rendering 3840x2160 upscale:',slug);
 const status=spawnSync('ffmpeg',args,{stdio:'inherit'});
 if(status.error)throw new Error('ffmpeg is required in PATH to generate optional 4K videos: '+status.error.message);
 if(status.status!==0)throw new Error('ffmpeg failed for '+slug);
}
console.log('Optional 4K upscales ready. Original content is 1080p, no additional detail is created.');
