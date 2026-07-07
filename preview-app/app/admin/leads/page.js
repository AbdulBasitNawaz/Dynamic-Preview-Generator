import { createClient } from '@supabase/supabase-js';
import LeadsTableClient from '@/components/admin/LeadsTableClient';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function LeadsPage() {
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="p-8 text-red-400">
        <p>Failed to load leads: {error.message}</p>
      </div>
    );
  }

  return <LeadsTableClient initialLeads={leads || []} />;
}
