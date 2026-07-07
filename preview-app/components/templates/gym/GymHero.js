'use client';

import { useState, useEffect } from 'react';
import { useLeadContext } from '@/contexts/LeadContext';
import CustomLink from '@/components/CustomLink';

const slides = [
  {
    subtitle: 'Shape your body',
    title: 'Be Strong Training Hard',
    cta: 'Get Info',
  },
  {
    subtitle: 'Push your limits',
    title: 'Achieve Your Goals',
    cta: 'Get Started',
  },
];

export default function GymHero() {
  const lead = useLeadContext();
  const [current, setCurrent] = useState(0);

  const heroImages = [lead.image1, lead.image2];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`hs-item${i === current ? ' hs-item--active' : ''}`}
          style={{ backgroundImage: `url(${heroImages[i] || '/gym/img/hero/hero-1.jpg'})` }}
        >
          <div className="container">
            <div className="hi-text">
              <span>{slide.subtitle}</span>
              <h1>
                {slide.title.split(' ').map((word, wi) =>
                  wi === 1 ? <strong key={wi}>{word} </strong> : word + ' '
                )}
              </h1>
              <CustomLink href="/contact" className="primary-btn">{slide.cta}</CustomLink>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Dots */}
      <div className="hero-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero-dot${i === current ? ' hero-dot--active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </section>
  );
}
