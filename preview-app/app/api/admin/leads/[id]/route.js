import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// PATCH — update a lead
export async function PATCH(req, { params }) {
  const { id } = await params;
  const body = await req.json();

  const payload = Object.fromEntries(
    Object.entries(body).map(([k, v]) => [k, v === '' ? null : v])
  );

  const { data, error } = await supabase
    .from('leads')
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

// DELETE — remove a lead
export async function DELETE(req, { params }) {
  const { id } = await params;

  const { error } = await supabase
    .from('leads')
    .delete()
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
