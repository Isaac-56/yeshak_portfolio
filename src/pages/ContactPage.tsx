import { useState, useRef, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { ArrowUpRight, Send, Github, Linkedin, Mail } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { useReveal } from '../hooks/useReveal';
const channels=[
 {name:'Email',info:'yeshak34@gmail.com',url:'mailto:yeshak34@gmail.com',icon:Mail},
 {name:'GitHub',info:'github.com/Isaac-56',url:'https://github.com/Isaac-56',icon:Github},
 {name:'LinkedIn',info:'Connect on LinkedIn',url:'https://www.linkedin.com/in/yeshak-tsegaye-899493384/',icon:Linkedin}
];
const service='service_wkr4ycf',template='template_rmpnv3v',publicKey='TfbfQ3ravn1_lPIRc';
export default function ContactPage(){
 const ref=useReveal();const formRef=useRef<HTMLFormElement>(null);
 const [status,setStatus]=useState<'idle'|'sending'|'sent'|'error'>('idle');
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();if(status==='sending'||!formRef.current)return;
  setStatus('sending');
  try{
   const response=await emailjs.sendForm(service,template,formRef.current,publicKey);
   if(response.status!==200)throw new Error('Unexpected email response');
   setStatus('sent');formRef.current.reset();
  }catch{setStatus('error');}
 }
 return <PageLayout label="Contact" title="Let's talk about your next idea." subtitle="Have a project, collaboration, or opportunity in mind? I'd love to hear from you.">
  <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
   <div className="lg:col-span-5 space-y-4">
    <p className="reveal text-xs uppercase tracking-[.22em] text-accent font-semibold mb-5">Find me elsewhere</p>
    {channels.map(({name,info,url,icon:Icon},i)=><a key={name} href={url} target={url.startsWith('http')?'_blank':undefined} rel={url.startsWith('http')?'noopener noreferrer':undefined} className={`reveal reveal-delay-${i+1} premium-project rounded-2xl flex items-center justify-between gap-3 p-6 group`}>
     <div className="flex gap-4 items-center"><Icon className="text-accent" size={23}/><div><p className="font-display font-semibold text-primary text-lg">{name}</p><p className="text-secondary text-sm break-all">{info}</p></div></div><ArrowUpRight className="text-secondary group-hover:text-accent transition-colors" size={20}/>
    </a>)}
    <p className="text-secondary text-sm pt-6">Based in Addis Ababa, Ethiopia · Open to remote collaboration.</p>
   </div>
   <div className="reveal reveal-delay-1 lg:col-span-7 premium-project rounded-3xl p-7 sm:p-10 md:p-12">
    {status==='sent'?<div role="status" className="py-16 text-center"><h2 className="font-display text-4xl font-bold text-primary">Message sent.</h2><p className="text-secondary mt-4">Thank you for reaching out. I'll get back to you soon.</p><button className="mt-8 text-accent underline" onClick={()=>setStatus('idle')}>Send another message</button></div>:
     <form ref={formRef} onSubmit={submit} className="space-y-6">
      <h2 className="font-display text-3xl text-primary font-bold mb-8">Start a conversation</h2>
      {status==='error'&&<div role="alert" className="rounded-xl border border-red-400 p-4 text-red-500">Your message could not be sent. Please try again or email me directly.</div>}
      <div className="grid sm:grid-cols-2 gap-5">
       <label className="block text-sm text-primary font-medium">Your name<input name="user_name" type="text" autoComplete="name" required maxLength={120} placeholder="Your name" className="block mt-2 w-full p-4 rounded-xl bg-bg border border-border focus:outline-none focus:border-accent"/></label>
       <label className="block text-sm text-primary font-medium">Email address<input name="user_email" type="email" autoComplete="email" required maxLength={180} placeholder="you@example.com" className="block mt-2 w-full p-4 rounded-xl bg-bg border border-border focus:outline-none focus:border-accent"/></label>
      </div>
      <label className="block text-sm text-primary font-medium">Subject<input name="subject" required maxLength={180} placeholder="Tell me what this is about" className="block mt-2 w-full p-4 rounded-xl bg-bg border border-border focus:outline-none focus:border-accent"/></label>
      <label className="block text-sm text-primary font-medium">Message<textarea name="message" rows={6} required maxLength={5000} placeholder="Tell me about your idea..." className="block mt-2 w-full p-4 rounded-xl bg-bg border border-border focus:outline-none focus:border-accent resize-y"/></label>
      <button disabled={status==='sending'} type="submit" className="premium-pill inline-flex items-center gap-3 bg-primary text-bg rounded-full px-7 py-4 font-semibold disabled:opacity-50">{status==='sending'?'Sending…':'Send message'}<Send size={18}/></button>
     </form>}
   </div>
  </div>
 </PageLayout>;
}
