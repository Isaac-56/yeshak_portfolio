import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, ArrowUpRight } from 'lucide-react';
import type { PortfolioTheme } from '../App';

const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Process', to: '/process' },
  { label: 'Skills', to: '/skills' },
  { label: 'Experience', to: '/experience' },
  { label: 'Contact', to: '/contact' },
];

export default function Navigation({theme,toggleTheme}:{theme:PortfolioTheme;toggleTheme:()=>void}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <nav aria-label="Main navigation" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || pathname !== '/' || mobileOpen ? 'bg-bg/90 backdrop-blur-xl border-b border-border' : 'bg-transparent'}`}>
    <div className="section-padding">
      <div className="flex items-center justify-between h-18 max-w-[1400px] mx-auto gap-4">
        <Link to="/" className="font-display font-bold text-lg tracking-tight text-primary shrink-0">Yeshak<span className="text-accent">.</span></Link>
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map(link => <Link key={link.to} to={link.to} aria-current={pathname===link.to?'page':undefined}
            className={`text-body-sm font-medium transition-colors hover:text-accent ${pathname === link.to ? 'text-accent' : 'text-secondary'}`}>{link.label}</Link>)}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="rounded-full border border-border p-2.5 text-primary hover:border-accent transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} title="Toggle appearance">
            {theme === 'dark' ? <Sun size={17}/> : <Moon size={17}/>}
          </button>
          <Link to="/contact" className="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary text-bg px-5 py-2.5 text-sm font-semibold hover:opacity-80 transition-opacity">
            Let's talk <ArrowUpRight size={16}/>
          </Link>
          <button onClick={() => setMobileOpen(v=>!v)} aria-expanded={mobileOpen} aria-label={mobileOpen?'Close menu':'Open menu'}
            className="lg:hidden rounded-full p-2 text-primary">{mobileOpen?<X size={24}/>:<Menu size={24}/>}</button>
        </div>
      </div>
    </div>
    {mobileOpen && <div className="lg:hidden bg-bg border-t border-border section-padding py-7 flex flex-col gap-5">
      {navLinks.map(link=><Link key={link.to} to={link.to} onClick={()=>setMobileOpen(false)} className="font-display text-xl text-primary">{link.label}</Link>)}
    </div>}
  </nav>;
}
