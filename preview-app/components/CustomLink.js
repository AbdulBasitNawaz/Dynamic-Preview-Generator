'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

/**
 * CustomLink wraps Next.js Link to automatically carry the ?lead= query
 * parameter across all internal navigations, ensuring branding is preserved.
 */
export default function CustomLink({ href, children, className, ...props }) {
  const searchParams = useSearchParams();
  const leadSlug = searchParams.get('lead');

  // Append ?lead= param if present
  let resolvedHref = href;
  if (leadSlug && typeof href === 'string' && !href.startsWith('http')) {
    const separator = href.includes('?') ? '&' : '?';
    resolvedHref = `${href}${separator}lead=${leadSlug}`;
  }

  return (
    <Link href={resolvedHref} className={className} {...props}>
      {children}
    </Link>
  );
}
