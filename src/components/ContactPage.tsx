import { useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Clock3, Github, Linkedin, Mail, MapPin, Send } from 'lucide-react';

// Same EmailJS service and template used by the original portfolio on main.
// These are EmailJS client/public identifiers, not server-side credentials.
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_wkr4ycf';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_rmpnv3v';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'TfbfQ3ravn1_lPIRc';

const contactMethods = [
  { label: 'Email', value: 'yeshak34@gmail.com', href: 'mailto:yeshak34@gmail.com', icon: Mail },
  { label: 'LinkedIn', value: 'linkedin.com/in/yeshak-tsegaye-899493384/', href: 'https://www.linkedin.com/in/yeshak-tsegaye-899493384/', icon: Linkedin },
  { label: 'GitHub', value: 'github.com/Isaac-56', href: 'https://github.com/Isaac-56', icon: Github },
];

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [preparedEmail, setPreparedEmail] = useState('mailto:yeshak34@gmail.com');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending || !formRef.current) return;
    const fields = new FormData(formRef.current);
    const name = String(fields.get('user_name') || '').trim();
    const email = String(fields.get('user_email') || '').trim();
    const subject = String(fields.get('subject') || '').trim();
    const message = String(fields.get('message') || '').trim();
    if (!name || !email || !subject || !message) {
      setError('Please complete all four fields.');
      return;
    }
    setSending(true);
    setError('');
    setPreparedEmail(`mailto:yeshak34@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`);
    try {
      // Support the original main-branch variable names AND standard EmailJS
      // templates. Recipient stays configured in the EmailJS template itself.
      const params = {
        user_name: name, user_email: email, subject, message,
        from_name: name, from_email: email, reply_to: email,
        name, email, title: subject,
        to_name: 'Yeshak',
        time: new Date().toLocaleString('en-US', { timeZone: 'Africa/Addis_Ababa' })
      };
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        params,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      if (response.status !== 200) throw response;
      formRef.current?.reset();
      setSent(true);
    } catch (cause) {
      // EmailJS errors expose 'status' and 'text'; preserve the actual reason
      // instead of disguising every failure as "use direct email".
      const details = cause as { status?: number; text?: string; message?: string };
      const status = typeof details?.status === 'number' ? details.status : 0;
      const text = String(details?.text || details?.message || '').slice(0, 220);
      if (status === 403) {
        setError('Email delivery was blocked by the email service (403). The service account, origin allowlist or CAPTCHA settings need checking. Your message has not been sent.');
      } else if (status === 412) {
        setError('Email delivery is temporarily unavailable (provider authorization error 412). Your message was not sent. You can open a prepared email below instead.');
      } else if (status === 400 || status === 404 || status === 422) {
        setError(`Email service configuration needs attention (error ${status}${text ? `: ${text}` : ''}). Your message has not been sent.`);
      } else if (status === 429) {
        setError('Too many messages have been sent recently. Please retry in a minute.');
      } else {
        setError(`The mail service could not deliver your message${status ? ` (error ${status})` : ''}. Please try again. Your message has not been sent.`);
      }
      // Log status only; never print private contact message contents.
      console.error('EmailJS delivery failure', { status, reason: text });
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="inner-page contact-page">
      <header className="wrap contact-heading" data-reveal>
        <Link to="/" className="contact-back"><ArrowLeft size={17}/> Back to home</Link>
        <span className="section-kicker">Contact / Let's talk</span>
        <h1>Let's create <em>something meaningful.</em></h1>
        <p>Have a project in mind or want to collaborate? I'd love to hear from you.</p>
      </header>

      <section className="contact-layout wrap" aria-label="Contact details and message form">
        <aside className="contact-aside" data-reveal>
          <span className="contact-column-label">01 / Reach out directly</span>
          <div className="contact-methods">
            {contactMethods.map(({label, value, href, icon: Icon}) => (
              <a className="contact-method" key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                <span className="contact-icon"><Icon size={19} strokeWidth={1.8}/></span>
                <span className="contact-method-copy"><small>{label}</small><strong>{value}</strong></span>
                <ArrowUpRight className="contact-method-arrow" size={19}/>
              </a>
            ))}
          </div>
          <div className="contact-availability">
            <div><MapPin size={17}/><span>Addis Ababa, Ethiopia</span></div>
            <div><Clock3 size={17}/><span>UTC+3 / East Africa Time</span></div>
            <div><span className="availability-dot" aria-hidden="true"/><span>Open to remote and on-site opportunities</span></div>
          </div>
        </aside>
        <div className="contact-form-panel" data-reveal>
          <div className="contact-form-top"><span className="contact-column-label">02 / Tell me about your idea</span><span className="contact-form-decor" aria-hidden="true">↗</span></div>
          {sent ? (
            <div className="contact-success" role="status" aria-live="polite">
              <span className="contact-success-icon"><CheckCircle2 size={32}/></span>
              <h2>Message sent.</h2>
              <p>Thank you for getting in touch. I'll respond as soon as I can.</p>
              <button type="button" onClick={() => {setSent(false); setError('');}} className="contact-reset">Send another message <ArrowUpRight size={17}/></button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="contact-form" aria-busy={sending}>
              <div className="contact-fields-row">
                <div className="contact-field">
                  <label htmlFor="contact-name">Name <span aria-hidden="true">*</span></label>
                  <input id="contact-name" name="user_name" type="text" required maxLength={120} autoComplete="name" placeholder="Your name" disabled={sending}/>
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-email">Email <span aria-hidden="true">*</span></label>
                  <input id="contact-email" name="user_email" type="email" required maxLength={254} autoComplete="email" placeholder="you@example.com" disabled={sending}/>
                </div>
              </div>
              <div className="contact-field">
                <label htmlFor="contact-subject">Subject <span aria-hidden="true">*</span></label>
                <input id="contact-subject" name="subject" type="text" required maxLength={160} placeholder="Project inquiry" disabled={sending}/>
              </div>
              <div className="contact-field">
                <label htmlFor="contact-message">Message <span aria-hidden="true">*</span></label>
                <textarea id="contact-message" name="message" rows={7} required maxLength={8000} placeholder="Tell me about your project..." disabled={sending}/>
              </div>
              {error && <div className="contact-error" role="alert"><p>{error}</p><a href={preparedEmail}>Open your email app with this message <ArrowUpRight size={14}/></a></div>}
              <div className="contact-form-actions">
                <button className="contact-send" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send message'}<Send size={18}/></button>
                <span>I'll only use your details to respond.</span>
              </div>
            </form>
          )}
        </div>
      </section>
      <div className="wrap contact-outro" data-reveal><span>Great ideas begin with a conversation.</span><span>© {new Date().getFullYear()} Yeshak Tsegaye</span></div>
    </main>
  );
}
