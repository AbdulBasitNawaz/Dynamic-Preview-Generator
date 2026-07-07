'use client';

import { useLeadContext } from '@/contexts/LeadContext';
import CustomLink from '@/components/CustomLink';

export default function GymBanner({ variant = 'default' }) {
  const lead = useLeadContext();

  if (variant === 'services') {
    return (
      <section
        className="banner-section spad"
        style={{ backgroundImage: `url(${lead.bannerBg})` }}
      >
        <div className="container">
          <div className="bs-text">
            <h2>Exercise until the body obeys.</h2>
            <div className="bt-tips">Where health, beauty and fitness meet.</div>
            <a href="#" className="primary-btn btn-normal play-btn">
              <i className="fa fa-caret-right" />
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="banner-section spad"
      style={{ backgroundImage: `url(${lead.bannerBg})` }}
    >
      <div className="container">
        <div className="bs-text">
          <h2>Registration now to get more deals</h2>
          <div className="bt-tips">Where health, beauty and fitness meet.</div>
          <CustomLink href="/contact" className="primary-btn btn-normal">Appointment</CustomLink>
        </div>
      </div>
    </section>
  );
}
