import { LeadStatus, LeadSource } from '../types';

// ✅ FIXED: Capital letters exactly matching Backend Enums
export const LEAD_STATUSES: { label: string; value: LeadStatus }[] = [
  { label: 'New', value: 'New' },           // ✅ 'New' not 'new'
  { label: 'Contacted', value: 'Contacted' }, // ✅ 'Contacted'
  { label: 'Qualified', value: 'Qualified' }, // ✅ 'Qualified'
  { label: 'Lost', value: 'Lost' },         // ✅ 'Lost'
  
];

// ✅ FIXED: Exactly matching Backend Enum ['Website', 'Instagram', 'Referral']
export const LEAD_SOURCES: { label: string; value: LeadSource }[] = [
  { label: 'Website', value: 'Website' },     // ✅ Capital W
  { label: 'Instagram', value: 'Instagram' }, // ✅ Capital I  
  { label: 'Referral', value: 'Referral' },   // ✅ Capital R
  
  
];

export const DEFAULT_PAGE_LIMIT = 10;

export const SORT_OPTIONS = [
  { label: 'Newest First', value: '-createdAt' },
  { label: 'Oldest First', value: 'createdAt' },
  { label: 'Name A-Z', value: 'name' },  
  { label: 'Name Z-A', value: '-name' },
];