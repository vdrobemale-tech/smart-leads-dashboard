import { useNavigate } from 'react-router-dom';
import { Mail, Phone, Building2, ArrowRight } from 'lucide-react';
import { Lead } from '../../types';
import LeadStatusBadge from './LeadStatusBadge';
import { formatDate } from '../../utils/formatDate';

interface LeadCardProps {
  lead: Lead;
}

const LeadCard = ({ lead }: LeadCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/leads/${lead._id}`)}
      className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-primary-200 transition-all cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
            {lead.name}
          </h3>
          <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5">
            <Building2 className="w-3.5 h-3.5" />
            {lead.company}
          </div>
        </div>
        <LeadStatusBadge status={lead.status} />
      </div>

      {/* Contact Info */}
      <div className="space-y-1.5 mb-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail className="w-3.5 h-3.5 text-gray-400" />
          <span className="truncate">{lead.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone className="w-3.5 h-3.5 text-gray-400" />
          {lead.phone}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">{formatDate(lead.createdAt)}</span>
        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary-500 transition-colors" />
      </div>
    </div>
  );
};

export default LeadCard;