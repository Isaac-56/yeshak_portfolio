// One-shot EmailJS diagnostic for the owner's already-configured public service.
// Sends exactly one harmless test email and reports the provider response status.
const template_params={
 user_name:'Portfolio delivery check',user_email:'yeshak34@gmail.com',
 subject:'Portfolio contact form system check',message:'One-time test of portfolio email delivery. No action needed if received.',
 from_name:'Portfolio delivery check',from_email:'yeshak34@gmail.com',
 reply_to:'yeshak34@gmail.com',name:'Portfolio delivery check',email:'yeshak34@gmail.com',
 title:'Portfolio contact form system check',to_name:'Yeshak',time:new Date().toISOString()
};
const payload={
 service_id:'service_wkr4ycf',template_id:'template_rmpnv3v',
 user_id:'TfbfQ3ravn1_lPIRc',template_params
};
try {
 const response=await fetch('https://api.emailjs.com/api/v1.0/email/send',{
 method:'POST',
 headers:{'content-type':'application/json','origin':'http://localhost:5173','referer':'http://localhost:5173/contact'},
 body:JSON.stringify(payload),signal:AbortSignal.timeout(14000)
 });
 const body=(await response.text()).slice(0,450);
 console.log('EmailJS API status:',response.status);
 console.log('EmailJS API response:',body);
 if(!response.ok)process.exitCode=1;
} catch (e) {
 console.error('EmailJS API unavailable:',String(e).slice(0,250));
 process.exitCode=1;
}
