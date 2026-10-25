import { readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const manifest = JSON.parse(readFileSync('public/projects/manifest.json','utf8'));
const expected=['baby-nest','reclaim','yenebet','medical-app','directed','blog-app','sarabi'];
const problems=[];
let total=0;
for(const slug of expected){
  const entries=manifest[slug];
  if(!Array.isArray(entries) || entries.length===0){problems.push(`No screens: ${slug}`);continue;}
  for(let index=0;index<entries.length;index++){
    const screen=entries[index];
    const name=String(index+1).padStart(2,'0')+'.webp';
    const file=join('public','projects',slug,name);
    if(!existsSync(file)){problems.push(`Missing: ${file}`);continue;}
    if(statSync(file).size<100){problems.push(`Empty: ${file}`);}
    if(!Number.isFinite(screen.width) || !Number.isFinite(screen.height) || screen.width<100 || screen.height<100)problems.push(`Invalid screen geometry: ${slug}/${name}`);
    total++;
  }
}
for(const file of [
 'public/images/hero-light.webp','public/images/hero-dark.webp','public/images/hero-dark-4k.webp',
 'public/projects/sarabi/tablet-preview.webp',
 'public/images/about-portrait.webp',
 ...expected.slice(0,3).flatMap(slug=>[`public/projects/${slug}/preview.mp4`,`public/projects/${slug}/poster.jpg`])
]){
 if(!existsSync(file) || statSync(file).size<100)problems.push(`Missing or empty artwork: ${file}`);
}
console.log(`Checked ${total} screenshot files across ${expected.length} case studies.`);
if(problems.length){console.error(problems.join('\n'));process.exitCode=1;}
else console.log('All reference assets and project media are present.');
