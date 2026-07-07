'use client';

import { useLeadContext } from '@/contexts/LeadContext';

const galleryImages = [
  { src: '/gym/img/gallery/gallery-1.jpg', wide: true },
  { src: '/gym/img/gallery/gallery-2.jpg', wide: false },
  { src: '/gym/img/gallery/gallery-3.jpg', wide: false },
  { src: '/gym/img/gallery/gallery-4.jpg', wide: false },
  { src: '/gym/img/gallery/gallery-5.jpg', wide: false },
  { src: '/gym/img/gallery/gallery-6.jpg', wide: true },
];

export default function GymGallery() {
  const lead = useLeadContext();

  // Override first 3 images with lead's custom images if available
  const displayImages = galleryImages.map((img, i) => {
    if (i === 0 && lead.image1) return { ...img, src: lead.image1 };
    if (i === 2 && lead.image2) return { ...img, src: lead.image2 };
    if (i === 4 && lead.image3) return { ...img, src: lead.image3 };
    return img;
  });

  return (
    <div className="gallery-section">
      <div className="gallery-grid">
        {displayImages.map((img, i) => (
          <div
            key={i}
            className={`gs-item${img.wide ? ' gs-item--wide' : ''}`}
            style={{ backgroundImage: `url(${img.src})` }}
          >
            <a href={img.src} className="thumb-icon" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-picture-o" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
