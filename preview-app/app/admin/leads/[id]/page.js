import { createClient } from '@supabase/supabase-js';
import LeadForm from '@/components/admin/LeadForm';
import { notFound } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function EditLeadPage({ params }) {
  const { id } = await params;
  const { data: lead, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !lead) return notFound();

  return <LeadForm mode="edit" initialData={lead} />;
}
