import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LayoutGrid, List } from 'lucide-react';
import { useLeads } from '../../hooks/useLeads';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import ErrorMessage from '../../components/common/ErrorMessage';
import LeadSearch from '../../components/leads/LeadSearch';
import LeadFilters from '../../components/leads/LeadFilters';
import LeadsTable from '../../components/leads/LeadsTable';
import LeadCard from '../../components/leads/LeadCard';
import ExportCSVButton from '../../components/leads/ExportCSVButton';
import Pagination from '../../components/common/Pagination';

const LeadsPage = () => {
  const navigate = useNavigate();
  const { leads, total, page, pages, filters, loading, error, getLeads, removeLead, changePage } = useLeads();
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  useEffect(() => {
    getLeads(filters);
  }, [filters.page]);

  const handlePageChange = (newPage: number) => {
    changePage(newPage);
  };

  const handleDelete = async (id: string) => {
    await removeLead(id);
    getLeads(filters);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {total} lead{total !== 1 ? 's' : ''} found
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ExportCSVButton />
          <Button onClick={() => navigate('/leads/create')}>
            <Plus className="w-4 h-4" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <LeadSearch />
          <div className="flex items-center gap-1 ml-auto">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'table'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-400 hover:bg-gray-100'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-400 hover:bg-gray-100'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
        <LeadFilters />
      </div>

      {/* Content */}
      {loading && leads.length === 0 ? (
        <Loader text="Loading leads..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={() => getLeads(filters)} />
      ) : leads.length === 0 ? (
        <EmptyState
          title="No leads found"
          description="Try adjusting your filters or create a new lead to get started."
        />
      ) : viewMode === 'table' ? (
        <>
          <LeadsTable leads={leads} onDelete={handleDelete} />
          <Pagination page={page} pages={pages} onPageChange={handlePageChange} />
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {leads.map((lead) => (
              <LeadCard key={lead._id} lead={lead} />
            ))}
          </div>
          <Pagination page={page} pages={pages} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  );
};

export default LeadsPage;