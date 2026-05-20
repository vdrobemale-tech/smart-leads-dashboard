import {
  LeadSource,
  LeadStatus,
} from '../types';

export const DEFAULT_PAGE_LIMIT =
  10;

export const LEAD_STATUSES: {
  label: string;
  value: LeadStatus;
}[] = [
  {
    label: 'New',
    value: 'new',
  },
  {
    label: 'Contacted',
    value: 'contacted',
  },
  {
    label: 'Qualified',
    value: 'qualified',
  },
  {
    label: 'Lost',
    value: 'lost',
  },
];

export const LEAD_SOURCES: {
  label: string;
  value: LeadSource;
}[] = [
  {
    label: 'Website',
    value: 'website',
  },
  {
    label: 'Referral',
    value: 'referral',
  },
];

export const SORT_OPTIONS = [
  {
    label:
      'Newest First',
    value:
      '-createdAt',
  },
  {
    label:
      'Oldest First',
    value:
      'createdAt',
  },
  {
    label:
      'Name A-Z',
    value: 'name',
  },
  {
    label:
      'Name Z-A',
    value: '-name',
  },
];