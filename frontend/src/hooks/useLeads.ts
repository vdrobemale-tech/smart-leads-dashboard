import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import {
  fetchLeads,
  fetchLeadById,
  createLead,
  updateLead,
  deleteLead,
  exportLeadsCSV,
  setFilters,
  setPage,
  clearFilters,
  clearLeadError,
  clearSingleLead,
} from '../store/slices/leadSlice';
import { LeadFilters, CreateLeadPayload, UpdateLeadPayload } from '../types';

export const useLeads = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { leads, lead, total, page, pages, filters, loading, error } = useSelector(
    (state: RootState) => state.leads
  );

  const getLeads = (filterParams?: LeadFilters) =>
    dispatch(fetchLeads(filterParams || filters));

  const getLeadById = (id: string) => dispatch(fetchLeadById(id));

  const addLead = (data: CreateLeadPayload) => dispatch(createLead(data));

  const editLead = (id: string, data: UpdateLeadPayload) =>
    dispatch(updateLead({ id, data }));

  const removeLead = (id: string) => dispatch(deleteLead(id));

  const exportCSV = () => dispatch(exportLeadsCSV());

  const updateFilters = (newFilters: Partial<LeadFilters>) =>
    dispatch(setFilters(newFilters));

  const changePage = (pageNum: number) => dispatch(setPage(pageNum));

  const resetFilters = () => dispatch(clearFilters());

  const resetError = () => dispatch(clearLeadError());

  const resetSingleLead = () => dispatch(clearSingleLead());

  return {
    leads,
    lead,
    total,
    page,
    pages,
    filters,
    loading,
    error,
    getLeads,
    getLeadById,
    addLead,
    editLead,
    removeLead,
    exportCSV,
    updateFilters,
    changePage,
    resetFilters,
    resetError,
    resetSingleLead,
  };
};