import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Lead, LeadFilters, CreateLeadPayload, UpdateLeadPayload, PaginatedData } from '../../types';
import leadService from '../../services/leadService';
import { DEFAULT_PAGE_LIMIT } from '../../constants';

interface LeadState {
  leads: Lead[];
  lead: Lead | null;
  total: number;
  page: number;
  pages: number;
  filters: LeadFilters;
  loading: boolean;
  error: string | null;
}

const initialState: LeadState = {
  leads: [],
  lead: null,
  total: 0,
  page: 1,
  pages: 1,
  filters: {
    status: '',
    source: '',
    search: '',
    sort: '-createdAt',
    page: 1,
    limit: DEFAULT_PAGE_LIMIT,
  },
  loading: false,
  error: null,
};

// Async Thunks
export const fetchLeads = createAsyncThunk(
  'leads/fetchAll',
  async (filters: LeadFilters, { rejectWithValue }) => {
    try {
      return await leadService.getLeads(filters);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch leads');
    }
  }
);

export const fetchLeadById = createAsyncThunk(
  'leads/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await leadService.getLeadById(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch lead');
    }
  }
);

export const createLead = createAsyncThunk(
  'leads/create',
  async (data: CreateLeadPayload, { rejectWithValue }) => {
    try {
      return await leadService.createLead(data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create lead');
    }
  }
);

export const updateLead = createAsyncThunk(
  'leads/update',
  async ({ id, data }: { id: string; data: UpdateLeadPayload }, { rejectWithValue }) => {
    try {
      return await leadService.updateLead(id, data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update lead');
    }
  }
);

export const deleteLead = createAsyncThunk(
  'leads/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await leadService.deleteLead(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete lead');
    }
  }
);

export const exportLeadsCSV = createAsyncThunk(
  'leads/exportCSV',
  async (_, { rejectWithValue }) => {
    try {
      return await leadService.exportCSV();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to export CSV');
    }
  }
);

const leadSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<LeadFilters>>) => {
      state.filters = { ...state.filters, ...action.payload, page: 1 };
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.filters.page = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {
        status: '',
        source: '',
        search: '',
        sort: '-createdAt',
        page: 1,
        limit: DEFAULT_PAGE_LIMIT,
      };
    },
    clearLeadError: (state) => {
      state.error = null;
    },
    clearSingleLead: (state) => {
      state.lead = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Leads
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeads.fulfilled, (state, action: PayloadAction<PaginatedData<Lead>>) => {
        state.loading = false;
        state.leads = action.payload.leads;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Lead By Id
    builder
      .addCase(fetchLeadById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeadById.fulfilled, (state, action: PayloadAction<Lead>) => {
        state.loading = false;
        state.lead = action.payload;
      })
      .addCase(fetchLeadById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create Lead
    builder
      .addCase(createLead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLead.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Lead
    builder
      .addCase(updateLead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLead.fulfilled, (state, action: PayloadAction<Lead>) => {
        state.loading = false;
        state.lead = action.payload;
      })
      .addCase(updateLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete Lead
    builder
      .addCase(deleteLead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLead.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.leads = state.leads.filter((lead) => lead._id !== action.payload);
        state.total -= 1;
      })
      .addCase(deleteLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Export CSV
    builder
      .addCase(exportLeadsCSV.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, setPage, clearFilters, clearLeadError, clearSingleLead } = leadSlice.actions;
export default leadSlice.reducer;