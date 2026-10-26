import {useEffect, useRef} from 'react';
import './LivingHero.css';

/**
 * Draw animated water highlights ON TOP of the original photographs.
 * The source image, portrait, shoreline, and theme framing never move.
 * This deliberately does not stretch, distort, or sample the hero image.
 */
export default function LivingHero() {
  const waterRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = waterRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', {alpha: true});
    if (!context) return;
    const ctx = context;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let active = true;
    let visible = true;
    let width = 1;
    let height = 1;
    let lastFrame = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      width = rect.width;
      height = rect.height;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const observer = new IntersectionObserver(entries => {
      visible = Boolean(entries[0]?.isIntersecting);
    }, {threshold: 0});
    observer.observe(canvas);

    function render(now: number) {
      if (!active) return;
      frame = requestAnimationFrame(render);
      if (!visible || reduced.matches || now - lastFrame < 32) return;
      lastFrame = now;
      const w = width;
      const h = height;
      if (w < 2 || h < 2) return;
      const t = now / 1000;
      const dark = document.documentElement.dataset.theme === 'dark';
      ctx.clearRect(0, 0, w, h);
      ctx.save();

      // The sea begins well to the right of the body and below the horizon.
      // A curved, feathered density per line keeps the edges invisible.
      ctx.beginPath();
      ctx.moveTo(w * .39, h * .445);
      ctx.bezierCurveTo(w * .54, h * .425, w * .78, h * .42, w, h * .405);
      ctx.lineTo(w, h * .88);
      ctx.bezierCurveTo(w * .8, h * .86, w * .56, h * .72, w * .47, h * .545);
      ctx.closePath();
      ctx.clip();
      ctx.globalCompositeOperation = 'screen';

      // Incoming wave fronts move visibly toward the shore, then fade out.
      // They are atmospheric strokes, never a deformation of image pixels.
      const cycle = .405;
      for (let i = 0; i < 12; i++) {
        const progress = ((i * .038 + t * .0105) % cycle) / cycle;
        const lineY = .445 + progress * cycle;
        const fadeIn = Math.min(1, progress * 8);
        const fadeOut = Math.min(1, (1 - progress) * 6);
        const strength = Math.min(fadeIn, fadeOut);
        const start = .40 + progress * .105;
        const y0 = lineY * h;
        const endX = w * 1.04;
        const startX = w * start;
        const amplitude = Math.min(6.5, 2.2 + i % 3 * 1.2 + w * .0015);

        ctx.save();
        ctx.globalAlpha = strength * (dark ? .77 : .70);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 1.15 + progress * 1.65;
        ctx.shadowBlur = dark ? 9 : 7;
        ctx.shadowColor = dark ? 'rgba(225,135,255,.50)' : 'rgba(255,243,218,.53)';

        // Broken, softly lit arcs feel closer to shallow water than stripes.
        // Their gaps travel with the moving crests.
        for (let section = 0; section < 8; section++) {
          const sectionStart = startX + (endX - startX) * section / 8;
          const sectionEnd = sectionStart + (endX - startX) * (.078 + .022 * (1 + Math.sin(i * 2.3 + section)) / 2);
          const gradient = ctx.createLinearGradient(sectionStart, y0, sectionEnd, y0);
          const base = dark ? '230,163,255' : '255,241,207';
          gradient.addColorStop(0, `rgba(${base},0)`);
          gradient.addColorStop(.28, `rgba(${base},.63)`);
          gradient.addColorStop(.65, `rgba(${base},.96)`);
          gradient.addColorStop(1, `rgba(${base},0)`);
          ctx.strokeStyle = gradient;
          ctx.beginPath();

          const segments = 16;
          for (let k = 0; k <= segments; k++) {
            const x = sectionStart + (sectionEnd - sectionStart) * k / segments;
            const u = x / w;
            const y = y0
              + (u - start) * h * .035
              + Math.sin(u * 28 + i * 1.37 - t * 1.95) * amplitude
              + Math.sin(u * 75 - i * .8 + t * 2.55) * amplitude * .28;
            if (k === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        ctx.restore();
      }

      // Sunlit water carries small moving glints in the right-hand shallows.
      ctx.save();
      for (let i = 0; i < 56; i++) {
        const xPart = ((i * .6180339 + t * (.009 + i % 4 * .002)) % 1);
        const yPart = ((i * .41373 + t * (.012 + i % 5 * .003)) % 1);
        const x = w * (.54 + xPart * .46);
        const y = h * (.465 + yPart * .36);
        const pulse = Math.pow(Math.max(0, Math.sin(t * 2.15 + i * 2.17)), 4);
        const opacity = (dark ? .47 : .42) * pulse;
        ctx.strokeStyle = dark ? `rgba(240,164,255,${opacity})` : `rgba(255,237,190,${opacity})`;
        ctx.lineWidth = .8 + (i % 3) * .5;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 4 + i % 6 * 2.5, y - 1.2);
        ctx.stroke();
      }
      ctx.restore();
      ctx.restore();
      canvas.dataset.running = 'true';
    }

    frame = requestAnimationFrame(render);
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return <div className="living-hero" aria-hidden="true">
    <canvas ref={waterRef} className="living-hero-water-canvas"/>
    <div className="living-hero-sea living-hero-sea-near"/>
    <div className="living-hero-glimmer"/>
    <div className="living-hero-shirt"/>
    <div className="living-hero-breeze"/>
  </div>;
}
