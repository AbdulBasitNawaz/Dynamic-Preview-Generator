'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LeadProvider } from '@/contexts/LeadContext';
import GymTemplate from '@/components/templates/gym/GymTemplate';

const TEMPLATE_MAP = {
  'Gym / Fitness': GymTemplate,
};

/**
 * Shared client component for all subpages (/about, /services, /classes, etc.)
 * Reads ?lead= from URL, fetches lead data, renders the correct template with the correct page.
 */
export default function SubPageClient({ page }) {
  const searchParams = useSearchParams();
  const leadSlug = searchParams.get('lead');

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!leadSlug) {
      setLoading(false);
      setNotFound(true);
      return;
    }

    fetch('/leads.json')
      .then(r => r.json())
      .then(data => {
        const found = data.find(l => l.slug === leadSlug);
        if (found) setLead(found);
        else setNotFound(true);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [leadSlug]);

  if (loading) {
    return (
      <div className="page-loading">
        <div className="loader" />
        <p>Loading preview...</p>
      </div>
    );
  }

  if (notFound || !lead) {
    return (
      <div className="not-found-page">
        <h2>No Lead Selected</h2>
        <p>Please access this page through a valid pitch link that includes a <strong>?lead=</strong> parameter.</p>
        <a href="/" className="primary-btn btn-normal">Go to Dashboard</a>
      </div>
    );
  }

  const TemplateComponent = TEMPLATE_MAP[lead.category] || GymTemplate;

  return (
    <LeadProvider lead={lead}>
      <TemplateComponent page={page} />
    </LeadProvider>
  );
}
