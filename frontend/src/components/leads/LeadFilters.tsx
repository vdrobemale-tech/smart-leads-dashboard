import { useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import { LEAD_STATUSES, LEAD_SOURCES, SORT_OPTIONS } from '../../constants';
import { useLeads } from '../../hooks/useLeads';
import Select from '../common/Select';
import Button from '../common/Button';

const LeadFilters = () => {
  const { filters, updateFilters, getLeads, resetFilters } = useLeads();

  useEffect(() => {
    getLeads(filters);
  }, [filters.status, filters.source, filters.sort]);

  const hasActiveFilters = filters.status || filters.source || filters.sort !== '-createdAt';

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Filters</span>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            <X className="w-3 h-3" />
            Clear
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="w-40">
          <Select
            options={LEAD_STATUSES.map((s) => ({ label: s.label, value: s.value }))}
            value={filters.status || ''}
            onChange={(e) => updateFilters({ status: e.target.value as any })}
            placeholder="All Statuses"
          />
        </div>

        <div className="w-40">
          <Select
            options={LEAD_SOURCES.map((s) => ({ label: s.label, value: s.value }))}
            value={filters.source || ''}
            onChange={(e) => updateFilters({ source: e.target.value as any })}
            placeholder="All Sources"
          />
        </div>

        <div className="w-44">
          <Select
            options={SORT_OPTIONS}
            value={filters.sort || '-createdAt'}
            onChange={(e) => updateFilters({ sort: e.target.value })}
            placeholder="Sort by"
          />
        </div>
      </div>
    </div>
  );
};

export default LeadFilters;