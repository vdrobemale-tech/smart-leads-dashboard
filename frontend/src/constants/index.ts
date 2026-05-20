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
    value: 'New',
  },
  {
    label: 'Contacted',
    value: 'Contacted',
  },
  {
    label: 'Qualified',
    value: 'Qualified',
  },
  {
    label: 'Lost',
    value: 'Lost',
  },
];

export const LEAD_SOURCES: {
  label: string;
  value: LeadSource;
}[] = [
  {
    label: 'Website',
    value: 'Website',
  },
  {
    label: 'Instagram',
    value: 'Instagram',
  },
  {
    label: 'Referral',
    value: 'Referral',
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
