/**
 * One-time script to import Dynamic_Whitelabel_Pipeline_Leads.xlsx into Supabase.
 * Run with: node scripts/importLeads.mjs
 */

import XLSX from 'xlsx';
import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Supabase credentials ──────────────────────────────────────────────────────
const SUPABASE_URL = 'https://zjtkhpkdebvesdjmofvs.supabase.co';
const SUPABASE_KEY = 'sb_publishable_rNUva1ncJJNvE3Lr74dXZA_YLguDNwK';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── Read Excel file ───────────────────────────────────────────────────────────
const filePath = resolve(__dirname, '../../Dynamic_Whitelabel_Pipeline_Leads.xlsx');
const workbook = XLSX.readFile(filePath);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet);

console.log(`📊 Found ${rows.length} rows in Excel file.`);
console.log('📋 Column names detected:', Object.keys(rows[0] || {}));

// ── Map Excel columns to DB columns ──────────────────────────────────────────
function mapRow(row, index) {
  const businessName = row['Business Name'] || `Business ${index + 1}`;
  const baseSlug = row['Firebase Slug (Document ID)'] || businessName.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');

  return {
    business_name: businessName,
    slug: baseSlug || `lead-${index + 1}`,
    category: row['Category'] || 'Gym / Fitness',
    primary_color: row['Primary Color (Hex)'] || '#f36100',
    logo_url: row['Logo URL'] || null,
    image1: row['Image URL 1'] || null,
    image2: row['Image URL 2'] || null,
    image3: row['Image URL 3'] || null,
    phone: row['Phone Number'] || null,
    status: 'draft',
  };
}

// ── Deduplicate by slug ───────────────────────────────────────────────────────
function deduplicateBySlug(leads) {
  const seen = new Map();
  leads.forEach((lead, i) => {
    let slug = lead.slug;
    if (seen.has(slug)) {
      slug = `${slug}-${i}`;
      lead = { ...lead, slug };
    }
    seen.set(slug, lead);
  });
  return Array.from(seen.values());
}

// ── Import to Supabase in batches ─────────────────────────────────────────────
async function importLeads() {
  const rawLeads = rows.map(mapRow);
  const leads = deduplicateBySlug(rawLeads);

  console.log('\n🔍 Preview of first row mapped:');
  console.log(leads[0]);
  console.log(`\n📦 Inserting ${leads.length} unique leads into Supabase...`);

  const batchSize = 20;
  let successCount = 0;

  for (let i = 0; i < leads.length; i += batchSize) {
    const batch = leads.slice(i, i + batchSize);
    const { error } = await supabase
      .from('leads')
      .upsert(batch, { onConflict: 'slug', ignoreDuplicates: false });

    if (error) {
      console.error(`\n❌ Batch ${Math.floor(i / batchSize) + 1} failed:`, error.message);
      console.error('Details:', error);
    } else {
      successCount += batch.length;
      console.log(`✅ Batch ${Math.floor(i / batchSize) + 1} done (${successCount}/${leads.length})`);
    }
  }

  console.log(`\n🎉 Import complete! ${successCount}/${leads.length} leads are now in Supabase.`);
}

importLeads();
