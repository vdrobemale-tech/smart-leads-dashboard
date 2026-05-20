import {
  useEffect,
  useState,
} from 'react';

import {
  useParams,
  useNavigate,
} from 'react-router-dom';

import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Calendar,
  FileText,
  Edit3,
  Trash2,
  Globe,
} from 'lucide-react';

import { useLeads } from '../../hooks/useLeads';

import { useAuthContext } from '../../context/AuthContext';

import { LEAD_SOURCES } from '../../constants';

import { formatDateTime } from '../../utils/formatDate';

import Loader from '../../components/common/Loader';

import ErrorMessage from '../../components/common/ErrorMessage';

import LeadStatusBadge from '../../components/leads/LeadStatusBadge';

import Button from '../../components/common/Button';

import Modal from '../../components/common/Modal';

import toast from 'react-hot-toast';

const LeadDetailsPage = () => {
  const { id } = useParams<{
    id: string;
  }>();

  const navigate = useNavigate();

  const { user } =
    useAuthContext();

  const {
    lead,
    loading,
    error,
    getLeadById,
    removeLead,
    resetSingleLead,
  } = useLeads();

  const [
    showDeleteModal,
    setShowDeleteModal,
  ] = useState(false);

  const isAdmin =
    user?.role === 'admin';

  useEffect(() => {
    if (id) {
      getLeadById(id);
    }

    return () => {
      resetSingleLead();
    };
  }, [id]);

  const handleDelete =
    async () => {
      if (!id) return;

      const result =
        await removeLead(id);

      if (
        result.meta
          .requestStatus ===
        'fulfilled'
      ) {
        toast.success(
          'Lead deleted successfully'
        );

        navigate('/leads');
      } else {
        toast.error(
          'Failed to delete lead'
        );
      }

      setShowDeleteModal(false);
    };

  const getSourceLabel = (
    value: string
  ) => {
    return (
      LEAD_SOURCES.find(
        (s) =>
          s.value === value
      )?.label || value
    );
  };

  if (loading) {
    return (
      <Loader text="Loading lead details..." />
    );
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() =>
          id &&
          getLeadById(id)
        }
      />
    );
  }

  if (!lead) {
    return (
      <ErrorMessage message="Lead not found" />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              navigate(-1)
            }
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">
                {lead.name}
              </h1>

              <LeadStatusBadge
                status={
                  lead.status
                }
              />
            </div>

            <p className="text-sm text-gray-500 mt-0.5">
              {
                lead.company
              }
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              navigate(
                `/leads/${lead._id}/edit`
              )
            }
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit
          </Button>

          {isAdmin && (
            <Button
              variant="danger"
              size="sm"
              onClick={() =>
                setShowDeleteModal(
                  true
                )
              }
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          )}
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">
            Contact Information
          </h2>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Email */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary-600" />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Email
              </p>

              <p className="text-sm font-medium text-gray-900">
                {lead.email}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Phone
              </p>

              <p className="text-sm font-medium text-gray-900">
                {lead.phone}
              </p>
            </div>
          </div>

          {/* Company */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-green-600" />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Company
              </p>

              <p className="text-sm font-medium text-gray-900">
                {
                  lead.company
                }
              </p>
            </div>
          </div>

          {/* Source */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-purple-600" />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Source
              </p>

              <p className="text-sm font-medium text-gray-900">
                {getSourceLabel(
                  lead.source
                )}
              </p>
            </div>
          </div>

          {/* Created */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-yellow-600" />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Created
              </p>

              <p className="text-sm font-medium text-gray-900">
                {formatDateTime(
                  lead.createdAt
                )}
              </p>
            </div>
          </div>

          {/* Updated */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-gray-600" />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Last Updated
              </p>

              <p className="text-sm font-medium text-gray-900">
                {formatDateTime(
                  lead.updatedAt
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Notes */}
        {lead.notes && (
          <>
            <div className="px-6 py-4 border-t border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">
                Notes
              </h2>
            </div>

            <div className="px-6 pb-6">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <FileText className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />

                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {lead.notes}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Delete Modal */}
      <Modal
        isOpen={
          showDeleteModal
        }
        onClose={() =>
          setShowDeleteModal(
            false
          )
        }
        title="Delete Lead"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Are you sure you
            want to delete{' '}
            <strong>
              {lead.name}
            </strong>
            ? This action
            cannot be undone.
          </p>

          <div className="flex items-center justify-end gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                setShowDeleteModal(
                  false
                )
              }
            >
              Cancel
            </Button>

            <Button
              variant="danger"
              size="sm"
              onClick={
                handleDelete
              }
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LeadDetailsPage;