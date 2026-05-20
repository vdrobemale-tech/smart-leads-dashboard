// ==================== User & Auth Types ====================

export type UserRole = 'admin' | 'sales';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// ==================== Lead Types ====================

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'lost' | 'won';
export type LeadSource = 'website' | 'referral' | 'linkedin' | 'cold_call' | 'advertisement' | 'other';

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: LeadStatus;
  source: LeadSource;
  notes?: string;
  assignedTo?: string | User;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLeadPayload {
  name: string;
  email: string;
  phone: string;
  company: string;
  status?: LeadStatus;
  source: LeadSource;
  notes?: string;
}

export type UpdateLeadPayload = Partial<CreateLeadPayload>;

export interface LeadFilters {
  status?: LeadStatus | '';
  source?: LeadSource | '';
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

// ==================== API Types ====================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedData<T> {
  leads: T[];
  total: number;
  page: number;
  pages: number;
}