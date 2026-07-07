'use client';

import { useLeadContext } from '@/contexts/LeadContext';
import CustomLink from '@/components/CustomLink';

export default function GymFooter() {
  const lead = useLeadContext();

  return (
    <>
      {/* Get In Touch Bar */}
      <div className="gettouch-section">
        <div className="container">
          <div className="gettouch-row">
            <div className="gt-text">
              <i className="fa fa-map-marker" />
              <p>Your City, Your Country</p>
            </div>
            <div className="gt-text">
              <i className="fa fa-mobile" />
              <ul>
                <li>{lead.phoneNumber || '000-000-0000'}</li>
              </ul>
            </div>
            <div className="gt-text email">
              <i className="fa fa-envelope" />
              <p>contact@{lead.slug || 'yourbusiness'}.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <section className="footer-section">
        <div className="container">
          <div className="footer-row">
            {/* About Column */}
            <div className="footer-col footer-col--about">
              <div className="fa-logo">
                <CustomLink href="/">
                  {lead.logoUrl ? (
                    <img src={lead.logoUrl} alt={lead.businessName} className="footer-logo-img" />
                  ) : (
                    <span className="footer-logo-text">{lead.logoText || lead.businessName}</span>
                  )}
                </CustomLink>
              </div>
              <p>
                {lead.businessName} is dedicated to helping you achieve your fitness goals
                with professional coaching, modern equipment, and a supportive community.
              </p>
              <div className="fa-social">
                <a href="#"><i className="fa fa-facebook" /></a>
                <a href="#"><i className="fa fa-twitter" /></a>
                <a href="#"><i className="fa fa-youtube-play" /></a>
                <a href="#"><i className="fa fa-instagram" /></a>
                <a href="#"><i className="fa fa-envelope-o" /></a>
              </div>
            </div>

            {/* Useful Links */}
            <div className="footer-col">
              <h4>Useful links</h4>
              <ul>
                <li><CustomLink href="/about">About</CustomLink></li>
                <li><CustomLink href="/blog">Blog</CustomLink></li>
                <li><CustomLink href="/classes">Classes</CustomLink></li>
                <li><CustomLink href="/contact">Contact</CustomLink></li>
              </ul>
            </div>

            {/* Support */}
            <div className="footer-col">
              <h4>Support</h4>
              <ul>
                <li><a href="#">My account</a></li>
                <li><a href="#">Subscribe</a></li>
                <li><CustomLink href="/contact">Contact</CustomLink></li>
                <li><CustomLink href="/bmi">BMI Check</CustomLink></li>
              </ul>
            </div>

            {/* Tips & Guides */}
            <div className="footer-col footer-col--wide">
              <h4>Tips &amp; Guides</h4>
              <div className="fw-recent">
                <h6><a href="#">Physical fitness may help prevent depression, anxiety</a></h6>
                <ul>
                  <li>3 min read</li>
                  <li>20 Comments</li>
                </ul>
              </div>
              <div className="fw-recent">
                <h6><a href="#">The best exercise to lose belly fat and tone up...</a></h6>
                <ul>
                  <li>3 min read</li>
                  <li>20 Comments</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="copyright-row">
            <div className="copyright-text">
              <p>
                Copyright &copy; {new Date().getFullYear()} {lead.businessName}. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
