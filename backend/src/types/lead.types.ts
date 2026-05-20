export interface CreateLeadInput {
  name: string;
  email: string;
  status?: 'New' | 'Contacted' | 'Qualified' | 'Lost';
  source: 'Website' | 'Instagram' | 'Referral';
}

export interface UpdateLeadInput {
  name?: string;
  email?: string;
  status?: 'New' | 'Contacted' | 'Qualified' | 'Lost';
  source?: 'Website' | 'Instagram' | 'Referral';
}

export interface LeadQuery {
  status?: 'New' | 'Contacted' | 'Qualified' | 'Lost';
  source?: 'Website' | 'Instagram' | 'Referral';
  search?: string;
  sort?: 'latest' | 'oldest';
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}