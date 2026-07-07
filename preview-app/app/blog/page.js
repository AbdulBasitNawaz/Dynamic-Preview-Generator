import { Suspense } from 'react';
import SubPageClient from '../SubPageClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="page-loading"><div className="loader" /></div>}>
      <SubPageClient page="blog" />
    </Suspense>
  );
}
