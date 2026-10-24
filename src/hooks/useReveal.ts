import { useEffect, useRef } from 'react';
export function useReveal(){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const root=ref.current;if(!root)return;
  const nodes=root.querySelectorAll<HTMLElement>('.reveal');
  if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches){
   nodes.forEach(n=>n.classList.add('visible'));return;
  }
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
  }),{threshold:0.04,rootMargin:'0px 0px 35px 0px'});
  nodes.forEach(n=>observer.observe(n));
  return()=>observer.disconnect();
 },[]);
 return ref;
}
