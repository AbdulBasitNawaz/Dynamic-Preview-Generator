# -*- coding: utf-8 -*-
"""
generate_links.py
=================
Reads Dynamic_Whitelabel_Pipeline_Leads.xlsx, generates personalized pitch URLs
for each lead, exports leads.json for the Next.js app, and writes pitch links
back into the Excel sheet in a new "Pitch Link" column.

USAGE:
  python generate_links.py

CONFIGURATION:
  Set BASE_URL below to your Vercel domain once deployed.
  Until then it defaults to localhost for local testing.
"""

import pandas as pd
import json
import os

# ─────────────────────────────────────────────────────────────
# CONFIGURE YOUR BASE URL HERE
# Change this to your Vercel URL once deployed, e.g.:
# BASE_URL = "https://your-project.vercel.app"
# ─────────────────────────────────────────────────────────────
BASE_URL = "http://localhost:3000"

EXCEL_FILE = "Dynamic_Whitelabel_Pipeline_Leads.xlsx"
OUTPUT_JSON = "preview-app/public/leads.json"
OUTPUT_EXCEL = "Dynamic_Whitelabel_Pipeline_Leads_With_Links.xlsx"


def clean(val):
    """Return empty string for NaN/None, else stripped string."""
    if val is None:
        return ""
    s = str(val).strip()
    return "" if s.lower() == "nan" else s


def main():
    print("[*] Reading Excel file...")
    df = pd.read_excel(EXCEL_FILE)

    # Rename columns to internal keys
    df.columns = [
        "slug", "businessName", "phoneNumber", "category",
        "primaryColor", "secondaryColor", "logoUrl",
        "image1", "image2", "image3"
    ]

    leads = []
    pitch_links = []

    for _, row in df.iterrows():
        slug = clean(row["slug"])
        lead = {
            "slug": slug,
            "businessName": clean(row["businessName"]),
            "phoneNumber": clean(row["phoneNumber"]),
            "category": clean(row["category"]),
            "primaryColor": clean(row["primaryColor"]),
            "secondaryColor": clean(row["secondaryColor"]),
            "logoUrl": clean(row["logoUrl"]),
            "image1": clean(row["image1"]),
            "image2": clean(row["image2"]),
            "image3": clean(row["image3"]),
        }
        leads.append(lead)

        # Generate pitch link
        link = f"{BASE_URL}/?lead={slug}" if slug else ""
        pitch_links.append(link)

    # ── Export leads.json ──────────────────────────────────────
    os.makedirs(os.path.dirname(OUTPUT_JSON), exist_ok=True)
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(leads, f, indent=2, ensure_ascii=False)
    print(f"✅ Exported {len(leads)} leads → {OUTPUT_JSON}")

    # ── Write pitch links back to Excel ──────────────────────
    df["Pitch Link"] = pitch_links
    df.to_excel(OUTPUT_EXCEL, index=False)
    print(f"✅ Updated Excel saved → {OUTPUT_EXCEL}")

    # ── Summary ───────────────────────────────────────────────
    categories = df["category"].value_counts()
    print("\n📋 Leads by Category:")
    for cat, count in categories.items():
        print(f"   {cat}: {count}")

    print(f"\n🔗 Sample Pitch Links:")
    for lead, link in zip(leads[:3], pitch_links[:3]):
        print(f"   [{lead['businessName']}] → {link}")

    print(f"\n🎉 Done! Open the Excel file to copy pitch links for your calls.")


if __name__ == "__main__":
    main()
