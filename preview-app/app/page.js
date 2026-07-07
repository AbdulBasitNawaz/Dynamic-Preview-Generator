import { Suspense } from 'react';
import HomePageClient from './HomePageClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="page-loading"><div className="loader" /></div>}>
      <HomePageClient />
    </Suspense>
  );
}
