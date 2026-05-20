import { useNavigate } from 'react-router-dom';
import { Eye, Trash2 } from 'lucide-react';
import { Lead } from '../../types';
import { useAuthContext } from '../../context/AuthContext';
import { formatDate } from '../../utils/formatDate';
import LeadStatusBadge from './LeadStatusBadge';
import Table from '../common/Table';
import Button from '../common/Button';
import toast from 'react-hot-toast';

interface LeadsTableProps {
  leads: Lead[];
  onDelete: (id: string) => void;
}

const LeadsTable = ({ leads, onDelete }: LeadsTableProps) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const isAdmin = user?.role === 'admin';

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      onDelete(id);
      toast.success('Lead deleted successfully');
    }
  };

  const columns = [
    {
      header: 'Name',
      accessor: 'name',
      render: (row: Lead) => (
        <span className="font-medium text-gray-900">{row.name}</span>
      ),
    },
    {
      header: 'Email',
      accessor: 'email',
      render: (row: Lead) => (
        <span className="text-gray-600">{row.email}</span>
      ),
    },
    {
      header: 'Company',
      accessor: 'company',
      render: (row: Lead) => (
        <span className="text-gray-600">{row.company}</span>
      ),
    },
    {
      header: 'Phone',
      accessor: 'phone',
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row: Lead) => <LeadStatusBadge status={row.status} />,
    },
    {
      header: 'Date',
      accessor: 'createdAt',
      render: (row: Lead) => (
        <span className="text-gray-500 text-xs">{formatDate(row.createdAt)}</span>
      ),
    },
    {
      header: 'Actions',
      accessor: '_id',
      render: (row: Lead) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/leads/${row._id}`)}
          >
            <Eye className="w-4 h-4 text-gray-500" />
          </Button>
          {isAdmin && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(row._id, row.name)}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  return <Table columns={columns} data={leads} />;
};

export default LeadsTable;