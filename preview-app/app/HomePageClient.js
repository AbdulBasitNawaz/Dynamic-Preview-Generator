'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LeadProvider } from '@/contexts/LeadContext';
import GymTemplate from '@/components/templates/gym/GymTemplate';
import SalesDashboard from '@/components/dashboard/SalesDashboard';

const TEMPLATE_MAP = {
  'Gym / Fitness': GymTemplate,
  // Future templates will be added here:
  // 'Salon / Spa': SalonTemplate,
  // 'Café / Restaurant': CafeTemplate,
  // 'Retail / E-commerce': RetailTemplate,
  // 'Local Business': LocalTemplate,
};

export default function HomePageClient() {
  const searchParams = useSearchParams();
  const leadSlug = searchParams.get('lead');
  const pageParam = searchParams.get('page') || 'home';

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(!!leadSlug);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!leadSlug) {
      return;
    }

    fetch('/leads.json')
      .then(r => r.json())
      .then(data => {
        const found = data.find(l => l.slug === leadSlug);
        if (found) {
          setLead(found);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [leadSlug]);

  // No ?lead= param → show Sales Dashboard
  if (!leadSlug) {
    return <SalesDashboard />;
  }

  // Loading state
  if (loading) {
    return (
      <div className="page-loading">
        <div className="loader" />
        <p>Loading preview...</p>
      </div>
    );
  }

  // Lead not found
  if (notFound || !lead) {
    return (
      <div className="not-found-page">
        <h2>Lead Not Found</h2>
        <p>The slug <strong>{leadSlug}</strong> does not exist in the leads database.</p>
        <Link href="/" className="primary-btn btn-normal">Go to Dashboard</Link>
      </div>
    );
  }

  // Route to correct template based on category
  const TemplateComponent = TEMPLATE_MAP[lead.category] || GymTemplate;

  return (
    <LeadProvider lead={lead}>
      <TemplateComponent page={pageParam} />
    </LeadProvider>
  );
}
