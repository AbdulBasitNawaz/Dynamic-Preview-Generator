/**
 * Default fallback assets per business category.
 * Used when a lead row is missing colors, logo, or images.
 */

export const CATEGORY_DEFAULTS = {
  'Gym / Fitness': {
    primaryColor: '#f36100',
    secondaryColor: '#151515',
    logoText: 'FitZone',
    image1: '/gym/img/hero/hero-1.jpg',
    image2: '/gym/img/hero/hero-2.jpg',
    image3: '/gym/img/banner-bg.jpg',
    bannerBg: '/gym/img/banner-bg.jpg',
    breadcrumbBg: '/gym/img/breadcrumb-bg.jpg',
    aboutImg: '/gym/img/about-us.jpg',
  },
  'Salon / Spa': {
    primaryColor: '#d4a373',
    secondaryColor: '#1b1b1b',
    logoText: 'Luxe Salon',
    image1: '/gym/img/hero/hero-1.jpg',
    image2: '/gym/img/hero/hero-2.jpg',
    image3: '/gym/img/banner-bg.jpg',
    bannerBg: '/gym/img/banner-bg.jpg',
    breadcrumbBg: '/gym/img/breadcrumb-bg.jpg',
    aboutImg: '/gym/img/about-us.jpg',
  },
  'Café / Restaurant': {
    primaryColor: '#b76e79',
    secondaryColor: '#1b1b1b',
    logoText: 'Café Co.',
    image1: '/gym/img/hero/hero-1.jpg',
    image2: '/gym/img/hero/hero-2.jpg',
    image3: '/gym/img/banner-bg.jpg',
    bannerBg: '/gym/img/banner-bg.jpg',
    breadcrumbBg: '/gym/img/breadcrumb-bg.jpg',
    aboutImg: '/gym/img/about-us.jpg',
  },
  'Retail / E-commerce': {
    primaryColor: '#4f46e5',
    secondaryColor: '#1b1b1b',
    logoText: 'ShopHub',
    image1: '/gym/img/hero/hero-1.jpg',
    image2: '/gym/img/hero/hero-2.jpg',
    image3: '/gym/img/banner-bg.jpg',
    bannerBg: '/gym/img/banner-bg.jpg',
    breadcrumbBg: '/gym/img/breadcrumb-bg.jpg',
    aboutImg: '/gym/img/about-us.jpg',
  },
  'Local Business': {
    primaryColor: '#0ea5e9',
    secondaryColor: '#1b1b1b',
    logoText: 'LocalPro',
    image1: '/gym/img/hero/hero-1.jpg',
    image2: '/gym/img/hero/hero-2.jpg',
    image3: '/gym/img/banner-bg.jpg',
    bannerBg: '/gym/img/banner-bg.jpg',
    breadcrumbBg: '/gym/img/breadcrumb-bg.jpg',
    aboutImg: '/gym/img/about-us.jpg',
  },
};

/**
 * Given a raw lead object from leads.json, resolve all missing fields
 * with category-appropriate defaults.
 */
export function resolveLeadAssets(lead) {
  const category = lead?.category || 'Gym / Fitness';
  const defaults = CATEGORY_DEFAULTS[category] || CATEGORY_DEFAULTS['Gym / Fitness'];

  return {
    ...lead,
    primaryColor: lead?.primaryColor || defaults.primaryColor,
    secondaryColor: lead?.secondaryColor || defaults.secondaryColor,
    logoUrl: lead?.logoUrl || null, // null means show text logo
    logoText: lead?.businessName || defaults.logoText,
    image1: lead?.image1 || defaults.image1,
    image2: lead?.image2 || defaults.image2,
    image3: lead?.image3 || defaults.image3,
    bannerBg: defaults.bannerBg,
    breadcrumbBg: defaults.breadcrumbBg,
    aboutImg: defaults.aboutImg,
  };
}
