import api from './api';
import {
  Lead,
  CreateLeadPayload,
  UpdateLeadPayload,
  LeadFilters,
  PaginatedData,
  ApiResponse,
} from '../types';
import { DEFAULT_PAGE_LIMIT } from '../constants';

const getLeads = async (filters: LeadFilters = {}): Promise<PaginatedData<Lead>> => {
  const params: Record<string, string | number> = {
    page: filters.page || 1,
    limit: filters.limit || DEFAULT_PAGE_LIMIT,
  };

  if (filters.status) params.status = filters.status;
  if (filters.source) params.source = filters.source;
  if (filters.search) params.search = filters.search;
  if (filters.sort) params.sort = filters.sort;

  const response = await api.get<ApiResponse<PaginatedData<Lead>>>('/leads', { params });
  return response.data.data;
};

const getLeadById = async (id: string): Promise<Lead> => {
  const response = await api.get<ApiResponse<Lead>>(`/leads/${id}`);
  return response.data.data;
};

const createLead = async (data: CreateLeadPayload): Promise<Lead> => {
  const response = await api.post<ApiResponse<Lead>>('/leads', data);
  return response.data.data;
};

const updateLead = async (id: string, data: UpdateLeadPayload): Promise<Lead> => {
  const response = await api.put<ApiResponse<Lead>>(`/leads/${id}`, data);
  return response.data.data;
};

const deleteLead = async (id: string): Promise<void> => {
  await api.delete(`/leads/${id}`);
};

const exportCSV = async (): Promise<BlobPart> => {
  const response = await api.get('/leads/export/csv', {
    responseType: 'text',
  });
  return response.data;
};

const leadService = {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  exportCSV,
};

export default leadService;