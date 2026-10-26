import './LivingHero.css';

/**
 * Overlay-only atmosphere. The approved hero photographs remain the sole
 * full-frame image, so the subject, horizon and light/dark registration
 * cannot be distorted or moved by an animated texture.
 */
export default function LivingHero() {
  return <div className="living-hero" aria-hidden="true">
    <div className="living-hero-sea living-hero-sea-near"/>
    <div className="living-hero-sea living-hero-sea-far"/>
    <div className="living-hero-glimmer"/>
    <div className="living-hero-shirt"/>
    <div className="living-hero-breeze"/>
  </div>;
}
