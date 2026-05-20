import { LeadSource, LeadStatus } from '../types';

export const LEAD_STATUSES: { label: string; value: LeadStatus }[] = [
  { label: 'New', value: 'new' },
  { label: 'Contacted', value: 'contacted' },
  { label: 'Qualified', value: 'qualified' },
  { label: 'Lost', value: 'lost' },
];

export const LEAD_SOURCES: { label: string; value: LeadSource }[] = [
  { label: 'Website', value: 'website' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'Referral', value: 'referral' },
];