import { useState, type FormEvent, useRef } from 'react';
import PageLayout from '../components/PageLayout';
import { useReveal } from '../hooks/useReveal';
import { Mail, Linkedin, Github, Send, ArrowUpRight, MapPin, Clock } from 'lucide-react';
import emailjs from '@emailjs/browser';

const links = [
  { 
    icon: Mail, 
    label: 'Email', 
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=yeshak34@gmail.com', 
    value: 'yeshak34@gmail.com' 
  },
  { 
    icon: Linkedin, 
    label: 'LinkedIn', 
    href: 'https://www.linkedin.com/in/yeshak-tsegaye-899493384/', 
    value: 'linkedin.com/in/yeshak-tsegaye-899493384/' 
  },
  { 
    icon: Github, 
    label: 'GitHub', 
    href: 'https://github.com/Isaac-56', 
    value: 'github.com/Isaac-56' 
  },
];

export default function ContactPage() {
  const ref = useReveal();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

 
  const EMAILJS_SERVICE_ID = 'service_wkr4ycf';
  const EMAILJS_TEMPLATE_ID = 'template_rmpnv3v';
  const EMAILJS_PUBLIC_KEY = 'TfbfQ3ravn1_lPIRc';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('🚀 Form submission started...');
    console.log('📋 EmailJS Credentials:', {
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      public_key: EMAILJS_PUBLIC_KEY,
    });

    try {
      if (formRef.current) {
        // Log form data
        const formData = {
          user_name: formRef.current.user_name?.value || 'Not found',
          user_email: formRef.current.user_email?.value || 'Not found',
          subject: formRef.current.subject?.value || 'Not found',
          message: formRef.current.message?.value || 'Not found',
        };
        console.log('📝 Form Data:', formData);

        console.log('📤 Sending email via EmailJS...');
        const result = await emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          formRef.current,
          EMAILJS_PUBLIC_KEY
        );
        
        console.log('✅ EmailJS Response:', result);
        
        if (result.status === 200) {
          console.log('🎉 Email sent successfully!');
          setSubmitted(true);
          formRef.current.reset();
        } else {
          console.error('❌ EmailJS returned non-200 status:', result.status);
          setError(`Failed to send message. Status: ${result.status}`);
        }
      } else {
        console.error('❌ Form reference is null');
        setError('Form error. Please try again.');
      }
    } catch (error) {
      console.error('❌ Email sending error:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        setError(`Failed to send message: ${error.message}`);
      } else {
        setError('Failed to send message. Please try again.');
      }
    } finally {
      setLoading(false);
      console.log('🏁 Form submission completed');
    }
  };

  return (
    <PageLayout
      label="Contact"
      title="Let's create something meaningful"
      subtitle="Have a project in mind or want to collaborate? I'd love to hear from you."
    >
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Contact links */}
          {links.map(({ icon: Icon, label, href, value }, i) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`reveal reveal-delay-${i + 1} flex items-center gap-4 p-5 bg-white border border-border rounded-xl hover:border-accent/30 hover:bg-accent-light/30 transition-all duration-300 group block`}
            >
              <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-label font-display font-600 text-secondary uppercase tracking-wider">
                  {label}
                </div>
                <div className="text-body-sm text-primary truncate">{value}</div>
              </div>
              <ArrowUpRight size={16} className="text-secondary/40 group-hover:text-accent transition-colors" />
            </a>
          ))}

          {/* Location & availability */}
          <div className="reveal reveal-delay-5 bg-white border border-border rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-accent" />
              <span className="text-body-sm font-medium text-primary">Addis Ababa, Ethiopia</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-accent" />
              <span className="text-body-sm text-secondary">UTC+3 (EAT)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-body-sm text-secondary">Open to remote & on-site opportunities</span>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="lg:col-span-7">
          <div className="reveal reveal-delay-2 bg-white border border-border rounded-2xl p-8 md:p-10">
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-accent-light flex items-center justify-center mx-auto">
                  <Send size={24} className="text-accent" />
                </div>
                <h3 className="font-display font-700 text-display-sm text-primary">
                  Message sent!
                </h3>
                <p className="text-body-md text-secondary">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-body-sm font-medium text-accent hover:underline mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-body-sm">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-label font-display font-600 text-secondary uppercase tracking-wider mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      name="user_name"
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-body-md text-primary placeholder:text-secondary/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-label font-display font-600 text-secondary uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="user_email"
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-body-md text-primary placeholder:text-secondary/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-label font-display font-600 text-secondary uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-body-md text-primary placeholder:text-secondary/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
                    placeholder="Project inquiry"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-label font-display font-600 text-secondary uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-body-md text-primary placeholder:text-secondary/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-3 px-7 py-3.5 bg-primary text-white text-body-sm font-medium rounded-lg hover:bg-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}