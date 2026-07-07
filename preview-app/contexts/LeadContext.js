'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { resolveLeadAssets } from '@/lib/defaults';

const LeadContext = createContext(null);

/**
 * LeadProvider wraps the entire app and:
 * 1. Holds the current lead data in React state
 * 2. Injects CSS custom properties (--primary-color, --secondary-color) into :root
 * 3. Exposes lead data to all child components via useLeadContext()
 */
export function LeadProvider({ lead, children }) {
  const resolvedLead = resolveLeadAssets(lead);

  useEffect(() => {
    if (resolvedLead.primaryColor) {
      document.documentElement.style.setProperty('--primary-color', resolvedLead.primaryColor);
    }
    if (resolvedLead.secondaryColor) {
      document.documentElement.style.setProperty('--secondary-color', resolvedLead.secondaryColor);
    }
  }, [resolvedLead.primaryColor, resolvedLead.secondaryColor]);

  return (
    <LeadContext.Provider value={resolvedLead}>
      {children}
    </LeadContext.Provider>
  );
}

/**
 * Hook to consume lead context in any component.
 */
export function useLeadContext() {
  const ctx = useContext(LeadContext);
  if (!ctx) throw new Error('useLeadContext must be used inside <LeadProvider>');
  return ctx;
}
