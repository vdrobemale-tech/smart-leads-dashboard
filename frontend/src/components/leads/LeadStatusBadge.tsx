import { LeadStatus } from '../../types';

interface LeadStatusBadgeProps {
  status?: LeadStatus | string | null;
}

const statusConfig: Record<
  string,
  { label: string; classes: string }
> = {
  new: {
    label: 'New',
    classes: 'bg-blue-100 text-blue-700',
  },

  contacted: {
    label: 'Contacted',
    classes: 'bg-yellow-100 text-yellow-700',
  },

  qualified: {
    label: 'Qualified',
    classes: 'bg-green-100 text-green-700',
  },

  lost: {
    label: 'Lost',
    classes: 'bg-red-100 text-red-700',
  },

  won: {
    label: 'Won',
    classes: 'bg-emerald-100 text-emerald-700',
  },
};

const defaultConfig = {
  label: 'Unknown',
  classes: 'bg-gray-100 text-gray-700',
};

const LeadStatusBadge = ({
  status,
}: LeadStatusBadgeProps) => {
  const safeStatus =
    typeof status === 'string'
      ? status.trim().toLowerCase()
      : 'new';

  const config =
    statusConfig[safeStatus] || defaultConfig;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.classes}`}
    >
      {config.label}
    </span>
  );
};

export default LeadStatusBadge;