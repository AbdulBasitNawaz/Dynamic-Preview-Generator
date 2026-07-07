'use client';

import GymHeader from './GymHeader';
import GymFooter from './GymFooter';
import GymHero from './GymHero';
import GymWhyUs from './GymWhyUs';
import GymClasses from './GymClasses';
import GymBanner from './GymBanner';
import GymPricing from './GymPricing';
import GymGallery from './GymGallery';
import GymTeam from './GymTeam';
import GymAbout from './GymAbout';
import GymTestimonials from './GymTestimonials';
import GymServices from './GymServices';
import GymTimetable from './GymTimetable';
import GymBMICalculator from './GymBMICalculator';
import GymContact from './GymContact';
import GymBlog from './GymBlog';
import GymBreadcrumb from './GymBreadcrumb';

/**
 * GymTemplate - Master layout for the Gym / Fitness category.
 * Renders the correct page view based on the `page` prop.
 * All navigation uses CustomLink so ?lead= param is always preserved.
 */
export default function GymTemplate({ page = 'home' }) {
  const renderPage = () => {
    switch (page) {
      case 'home':
        return (
          <>
            <GymHero />
            <GymWhyUs />
            <GymClasses />
            <GymBanner />
            <GymPricing />
            <GymGallery />
            <GymTeam />
          </>
        );

      case 'about':
        return (
          <>
            <GymBreadcrumb title="About Us" crumbs={[{ label: 'About' }]} />
            <GymWhyUs />
            <GymAbout />
            <GymTeam />
            <GymBanner />
            <GymTestimonials />
          </>
        );

      case 'services':
        return (
          <>
            <GymBreadcrumb title="Services" crumbs={[{ label: 'Services' }]} />
            <GymServices />
            <GymBanner variant="services" />
            <GymPricing />
          </>
        );

      case 'classes':
        return (
          <>
            <GymBreadcrumb title="Our Classes" crumbs={[{ label: 'Classes' }]} />
            <GymClasses />
            <GymBanner />
            <GymTimetable />
          </>
        );

      case 'timetable':
        return (
          <>
            <GymBreadcrumb
              title="Classes Timetable"
              crumbs={[{ label: 'Pages', href: '#' }, { label: 'Timetable' }]}
            />
            <GymTimetable />
          </>
        );

      case 'bmi':
        return (
          <>
            <GymBreadcrumb
              title="BMI Calculator"
              crumbs={[{ label: 'Pages', href: '#' }, { label: 'BMI Calculator' }]}
            />
            <GymBMICalculator />
          </>
        );

      case 'team':
        return (
          <>
            <GymBreadcrumb title="Our Team" crumbs={[{ label: 'Team' }]} />
            <GymTeam />
            <GymBanner />
          </>
        );

      case 'gallery':
        return (
          <>
            <GymBreadcrumb title="Gallery" crumbs={[{ label: 'Gallery' }]} />
            <GymGallery />
          </>
        );

      case 'blog':
        return (
          <>
            <GymBreadcrumb title="Our Blog" crumbs={[{ label: 'Blog' }]} />
            <GymBlog />
          </>
        );

      case 'contact':
        return (
          <>
            <GymBreadcrumb title="Contact Us" crumbs={[{ label: 'Contact' }]} />
            <GymContact />
          </>
        );

      default:
        return (
          <>
            <GymHero />
            <GymWhyUs />
            <GymClasses />
            <GymBanner />
            <GymPricing />
            <GymGallery />
            <GymTeam />
          </>
        );
    }
  };

  return (
    <div className="gym-template">
      <GymHeader activePage={page} />
      <main>{renderPage()}</main>
      <GymFooter />
    </div>
  );
}
