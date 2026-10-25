import { useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Clock3, Github, Linkedin, Mail, MapPin, Send } from 'lucide-react';

// Same EmailJS service and template used by the original portfolio on main.
// These are EmailJS client/public identifiers, not server-side credentials.
const EMAILJS_SERVICE_ID = 'service_wkr4ycf';
const EMAILJS_TEMPLATE_ID = 'template_rmpnv3v';
const EMAILJS_PUBLIC_KEY = 'TfbfQ3ravn1_lPIRc';

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending || !formRef.current) return;
    setSending(true);
    setError('');
    try {
      // Preserve the exact EmailJS template fields from the working main-branch form.
      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      if (result.status !== 200) throw new Error('Email service returned an unsuccessful status');
      formRef.current?.reset();
      setSent(true);
    } catch (cause) {
      console.error('EmailJS contact form failed:', cause);
      setError('Your message could not be sent. Please try again, or email me directly.');
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
              {error && <p className="contact-error" role="alert">{error} <a href="mailto:yeshak34@gmail.com">Email directly <ArrowUpRight size={14}/></a></p>}
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
