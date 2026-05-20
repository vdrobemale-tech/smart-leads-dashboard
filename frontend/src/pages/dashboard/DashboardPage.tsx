import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Users,
  UserCheck,
  UserX,
  TrendingUp,
  Plus,
  ArrowRight,
} from 'lucide-react';

import { useLeads } from '../../hooks/useLeads';
import { useAuth } from '../../hooks/useAuth';

import Loader from '../../components/common/Loader';
import Button from '../../components/common/Button';

import LeadStatusBadge from '../../components/leads/LeadStatusBadge';

import { formatDate } from '../../utils/formatDate';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const StatCard = ({
  title,
  value,
  icon,
  color,
  bgColor,
}: StatCardProps) => (
  <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">
          {title}
        </p>

        <p className="text-3xl font-bold text-gray-900 mt-1">
          {value}
        </p>
      </div>

      <div
        className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center`}
      >
        <div className={color}>
          {icon}
        </div>
      </div>
    </div>
  </div>
);

const DashboardPage = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  // ✅ FIXED
  const {
    leads,
    total,
    getLeads,
    loading,
  } = useLeads();

  useEffect(() => {
    getLeads({
      page: 1,
      limit: 100,
    });
  }, []);

  const stats = {
    total: total || 0,

    new: leads.filter(
      (l) => l.status === 'new'
    ).length,

    qualified: leads.filter(
      (l) =>
        l.status === 'qualified'
    ).length,

    lost: leads.filter(
      (l) => l.status === 'lost'
    ).length,
  };

  // ✅ FIXED
<<<<<<< HEAD
  if (loading && leads.length === 0) {
=======
  if (
    loading &&
    leads.length === 0
  ) {
>>>>>>> 4db8117 (fixed build)
    return <Loader />;
  }

  const recentLeads =
    leads.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back,{' '}
            {
              user?.name?.split(
                ' '
              )[0]
            }{' '}
            👋
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Here's what's happening
            with your leads today.
          </p>
        </div>

        <Button
          onClick={() =>
            navigate(
              '/leads/create'
            )
          }
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Lead
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Leads"
          value={stats.total}
          icon={
            <Users className="w-6 h-6" />
          }
          color="text-indigo-600"
          bgColor="bg-indigo-50"
        />

        <StatCard
          title="New Leads"
          value={stats.new}
          icon={
            <TrendingUp className="w-6 h-6" />
          }
          color="text-blue-600"
          bgColor="bg-blue-50"
        />

        <StatCard
          title="Qualified"
          value={stats.qualified}
          icon={
            <UserCheck className="w-6 h-6" />
          }
          color="text-emerald-600"
          bgColor="bg-emerald-50"
        />

        <StatCard
          title="Lost Leads"
          value={stats.lost}
          icon={
            <UserX className="w-6 h-6" />
          }
          color="text-red-600"
          bgColor="bg-red-50"
        />
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">
            Recent Leads
          </h2>

          {/* ✅ FIXED */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              navigate('/leads')
            }
          >
            View All{' '}
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {recentLeads.length ===
        0 ? (
          <div className="px-5 py-10 text-center">
            <p className="text-sm text-gray-500">
              No leads found.
              Create your first
              lead!
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentLeads.map(
              (lead) => (
                <div
                  key={lead._id}
                  onClick={() =>
                    navigate(
                      `/leads/${lead._id}`
                    )
                  }
                  className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold">
                        {lead.name
                          .charAt(
                            0
                          )
                          .toUpperCase()}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {lead.name}
                      </p>

                      <p className="text-xs text-gray-500 truncate">
                        {lead.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                    <LeadStatusBadge
                      status={
                        lead.status
                      }
                    />

                    <span className="text-xs text-gray-400 hidden sm:block">
                      {formatDate(
                        lead.createdAt
                      )}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
