import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  Building2,
  Save,
} from 'lucide-react';

import {
  Lead,
  CreateLeadPayload,
  UpdateLeadPayload,
  LeadStatus,
  LeadSource,
} from '../../types';

import { useLeads } from '../../hooks/useLeads';

import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';

import toast from 'react-hot-toast';

interface LeadFormProps {
  initialData?: Lead;
  isEdit?: boolean;
}

const STATUS_OPTIONS = [
  { label: 'New', value: 'new' },
  { label: 'Contacted', value: 'contacted' },
  { label: 'Qualified', value: 'qualified' },
  { label: 'Lost', value: 'lost' },
];

const SOURCE_OPTIONS = [
  { label: 'Website', value: 'website' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'Referral', value: 'referral' },
];

const LeadForm = ({
  initialData,
  isEdit = false,
}: LeadFormProps) => {
  const navigate = useNavigate();

  const { addLead, editLead, loading } =
    useLeads();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');

  const [status, setStatus] =
    useState<LeadStatus>('new');

  const [source, setSource] =
    useState<LeadSource>('website');

  const [notes, setNotes] = useState('');

  const [formErrors, setFormErrors] =
    useState<
      Record<string, string | undefined>
    >({});

  useEffect(() => {
    if (initialData && isEdit) {
      setName(initialData.name || '');
      setEmail(initialData.email || '');
      setPhone(initialData.phone || '');
      setCompany(initialData.company || '');

      setStatus(
        (initialData.status as LeadStatus) ||
          'new'
      );

      setSource(
        (initialData.source as LeadSource) ||
          'website'
      );

      setNotes(initialData.notes || '');
    }
  }, [initialData, isEdit]);

  const validate = (): boolean => {
    const errors: Record<
      string,
      string | undefined
    > = {};

    if (!name.trim()) {
      errors.name = 'Name is required';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      errors.email =
        'Please enter valid email';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (
    e: FormEvent
  ) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      if (isEdit && initialData) {
        const payload: UpdateLeadPayload = {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          company:
            company.trim() || undefined,
          status,
          source,
          notes: notes.trim() || undefined,
        };

        const result = await editLead(
          initialData._id,
          payload
        );

        if (
          result.meta.requestStatus ===
          'fulfilled'
        ) {
          toast.success(
            'Lead updated successfully'
          );

          navigate(
            `/leads/${initialData._id}`
          );
        } else {
          toast.error(
            'Failed to update lead'
          );
        }
      } else {
        const payload: CreateLeadPayload = {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: company.trim(),
          status,
          source,
          notes: notes.trim() || undefined,
        };

        const result = await addLead(
          payload
        );

        if (
          result.meta.requestStatus ===
          'fulfilled'
        ) {
          toast.success(
            'Lead created successfully'
          );

          navigate('/leads');
        } else {
          toast.error(
            'Failed to create lead'
          );
        }
      }
    } catch (error) {
      console.error(error);

      toast.error(
        'Something went wrong'
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Full Name *"
          placeholder="Enter full name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          error={formErrors.name}
          icon={
            <User className="w-4 h-4 text-gray-400" />
          }
        />

        <Input
          label="Email Address *"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          error={formErrors.email}
          icon={
            <Mail className="w-4 h-4 text-gray-400" />
          }
        />

        <Input
          label="Phone"
          type="tel"
          placeholder="+91 9876543210"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          error={formErrors.phone}
          icon={
            <Phone className="w-4 h-4 text-gray-400" />
          }
        />

        <Input
          label="Company"
          placeholder="Company name"
          value={company}
          onChange={(e) =>
            setCompany(e.target.value)
          }
          error={formErrors.company}
          icon={
            <Building2 className="w-4 h-4 text-gray-400" />
          }
        />

        <Select
          label="Status *"
          options={STATUS_OPTIONS}
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value as LeadStatus
            )
          }
          error={formErrors.status}
          placeholder="Select status"
        />

        <Select
          label="Source *"
          options={SOURCE_OPTIONS}
          value={source}
          onChange={(e) =>
            setSource(
              e.target.value as LeadSource
            )
          }
          error={formErrors.source}
          placeholder="Select source"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>

        <textarea
          rows={4}
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          placeholder="Add notes..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="submit"
          loading={loading}
          disabled={loading}
        >
          <Save className="w-4 h-4 mr-2" />

          {isEdit
            ? 'Update Lead'
            : 'Create Lead'}
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default LeadForm;