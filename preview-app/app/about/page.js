import { Suspense } from 'react';
import SubPageClient from '../SubPageClient';

export default function AboutPage() {
  return (
    <Suspense fallback={<div className="page-loading"><div className="loader" /></div>}>
      <SubPageClient page="about" />
    </Suspense>
  );
}
