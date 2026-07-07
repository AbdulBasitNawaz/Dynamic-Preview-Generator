'use client';

import { useState } from 'react';
import { useLeadContext } from '@/contexts/LeadContext';
import CustomLink from '@/components/CustomLink';

export default function GymHeader({ activePage = 'home' }) {
  const lead = useLeadContext();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Home', page: 'home', href: '/' },
    { label: 'About Us', page: 'about', href: '/about' },
    { label: 'Classes', page: 'classes', href: '/classes' },
    { label: 'Services', page: 'services', href: '/services' },
    { label: 'Our Team', page: 'team', href: '/team' },
    { label: 'Contact', page: 'contact', href: '/contact' },
  ];

  const dropdownLinks = [
    { label: 'About us', page: 'about', href: '/about' },
    { label: 'Classes timetable', page: 'timetable', href: '/timetable' },
    { label: 'BMI Calculator', page: 'bmi', href: '/bmi' },
    { label: 'Our team', page: 'team', href: '/team' },
    { label: 'Gallery', page: 'gallery', href: '/gallery' },
    { label: 'Our blog', page: 'blog', href: '/blog' },
  ];

  return (
    <>
      {/* Offcanvas Mobile Menu */}
      {mobileOpen && (
        <div className="offcanvas-overlay" onClick={() => setMobileOpen(false)} />
      )}
      <div className={`offcanvas-menu-wrapper${mobileOpen ? ' offcanvas-menu-wrapper--open' : ''}`}>
        <button className="canvas-close" onClick={() => setMobileOpen(false)}>✕</button>
        <nav className="canvas-menu">
          <ul>
            {navLinks.map(link => (
              <li key={link.page} className={activePage === link.page ? 'active' : ''}>
                <CustomLink href={link.href}>{link.label}</CustomLink>
              </li>
            ))}
            <li>
              <span>Pages</span>
              <ul className="dropdown">
                {dropdownLinks.map(link => (
                  <li key={link.page}>
                    <CustomLink href={link.href}>{link.label}</CustomLink>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
        <div className="canvas-social">
          <a href="#"><i className="fa fa-facebook" /></a>
          <a href="#"><i className="fa fa-twitter" /></a>
          <a href="#"><i className="fa fa-youtube-play" /></a>
          <a href="#"><i className="fa fa-instagram" /></a>
        </div>
      </div>

      {/* Main Header */}
      <header className="header-section">
        <div className="container-fluid">
          <div className="header-row">
            {/* Logo */}
            <div className="logo">
              <CustomLink href="/">
                {lead.logoUrl ? (
                  <img src={lead.logoUrl} alt={lead.businessName} className="logo-img" />
                ) : (
                  <span className="logo-text">{lead.logoText || lead.businessName}</span>
                )}
              </CustomLink>
            </div>

            {/* Desktop Nav */}
            <nav className="nav-menu">
              <ul>
                {navLinks.map(link => (
                  <li key={link.page} className={activePage === link.page ? 'active' : ''}>
                    <CustomLink href={link.href}>{link.label}</CustomLink>
                  </li>
                ))}
                <li className="has-dropdown">
                  <a href="#">Pages</a>
                  <ul className="dropdown">
                    {dropdownLinks.map(link => (
                      <li key={link.page}>
                        <CustomLink href={link.href}>{link.label}</CustomLink>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>

            {/* Social + Mobile Toggle */}
            <div className="top-option">
              <div className="to-social">
                <a href="#"><i className="fa fa-facebook" /></a>
                <a href="#"><i className="fa fa-twitter" /></a>
                <a href="#"><i className="fa fa-youtube-play" /></a>
                <a href="#"><i className="fa fa-instagram" /></a>
              </div>
              <button className="canvas-open" onClick={() => setMobileOpen(true)}>
                <i className="fa fa-bars" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
