'use client';

import { useLeadContext } from '@/contexts/LeadContext';
import CustomLink from '@/components/CustomLink';

export default function GymAbout() {
  const lead = useLeadContext();

  return (
    <>
      {/* About Video / Image Section */}
      <section className="aboutus-section">
        <div className="about-row">
          <div
            className="about-video"
            style={{ backgroundImage: `url(${lead.aboutImg || '/gym/img/about-us.jpg'})` }}
          >
            <a
              href="https://www.youtube.com/watch?v=EzKkl64rRbM"
              className="play-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-caret-right" />
            </a>
          </div>

          <div className="about-text">
            <div className="section-title">
              <span>About Us</span>
              <h2>What We Have Done</h2>
            </div>
            <div className="at-desc">
              <p>
                {lead.businessName} is committed to delivering the finest fitness experience.
                Our certified trainers, state-of-the-art facilities, and customized programs
                ensure you reach your full potential safely and effectively.
              </p>
            </div>
            <div className="about-bar">
              {[
                { label: 'Body Building', pct: 80 },
                { label: 'Training', pct: 85 },
                { label: 'Fitness', pct: 75 },
              ].map((bar, i) => (
                <div key={i} className="ab-item">
                  <p>{bar.label}</p>
                  <div className="progress-bar-track">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${bar.pct}%` }}
                    >
                      <span className="progress-tip">{bar.pct}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
