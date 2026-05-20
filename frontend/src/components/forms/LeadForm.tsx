import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Building2, FileText, Save } from 'lucide-react';
import { Lead, CreateLeadPayload, UpdateLeadPayload } from '../../types';
import { useLeads } from '../../hooks/useLeads';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import toast from 'react-hot-toast';

interface LeadFormProps {
  initialData?: Lead;
  isEdit?: boolean;
}

// ✅ STATUS OPTIONS - EXACT MATCH WITH BACKEND ENUMS
const STATUS_OPTIONS = [
  { label: 'New', value: 'New' },           // Capital N important!
  { label: 'Contacted', value: 'Contacted' },
  { label: 'Qualified', value: 'Qualified' },
  { label: 'Lost', value: 'Lost' }
];

// ✅ SOURCE OPTIONS - EXACT MATCH WITH BACKEND ENUMS  
const SOURCE_OPTIONS = [
  { label: 'Website', value: 'Website' },   // Exact spelling!
  { label: 'Instagram', value: 'Instagram' },
  { label: 'Referral', value: 'Referral' }
];

const LeadForm = ({ initialData, isEdit = false }: LeadFormProps) => {
  const navigate = useNavigate();
  const { addLead, editLead, loading } = useLeads();

  // ✅ Fixed Initial States (with proper defaults)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<string>('New');        // ✅ Default 'New'
  const [source, setSource] = useState<string>('Website');     // ✅ Default 'Website'
  const [notes, setNotes] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string | undefined>>({});

  // Populate form for edit mode
  useEffect(() => {
    if (initialData && isEdit) {
      setName(initialData.name);
      setEmail(initialData.email);
      setPhone(initialData.phone || '');
      setCompany(initialData.company || '');
      setStatus(initialData.status || 'New');
      setSource(initialData.source || 'Website');
      setNotes(initialData.notes || '');
    }
  }, [initialData, isEdit]);

  // ✅ Enhanced Validation
  const validate = (): boolean => {
    const errors: Record<string, string | undefined> = {};

    if (!name.trim()) {
      errors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Phone optional lekin agar diya to validate
    if (phone.trim() && !/^[\d\s\-+()]+$/.test(phone)) {
      errors.phone = 'Please enter valid phone number';
    }

    // Company optional
    if (company.trim() && company.trim().length < 2) {
      errors.company = 'Company name too short';
    }

    // ✅ Status Validation (important fix)
    if (!status) {
      errors.status = 'Please select a status';
    }

    // ✅ Source Validation (important fix)
    if (!source) {
      errors.source = 'Please select a source';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setFormErrors({});
    
    if (!validate()) return;

    try {
      if (isEdit && initialData) {
        // UPDATE MODE
        const payload: UpdateLeadPayload = {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,    // ✅ Empty to undefined
          company: company.trim() || undefined, // ✅ Empty to undefined
          status: status as any,               // ✅ Already validated
          source: source as any,               // ✅ Already validated
          notes: notes.trim() || undefined,
        };

        const result = await editLead(initialData._id, payload);
        if (result.meta.requestStatus === 'fulfilled') {
          toast.success('Lead updated successfully!');
          navigate(`/leads/${initialData._id}`);
        } else {
          toast.error(result.payload || 'Failed to update lead');
        }
      } else {
        // CREATE MODE - ✅ FIXED PAYLOAD
        const payload: CreateLeadPayload = {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),              // ✅ Send as string
          company: company.trim(),           // ✅ Send as string
          
          // ✅ CRITICAL FIX: Proper defaults matching backend enums
          status: (status || 'New').trim(), 
          source: (source || 'Website').trim(), // Fallback if empty somehow
          
          notes: notes.trim() || undefined,
        };

        console.log('Submitting Payload:', payload); // Debug log

        const result = await addLead(payload);
        
        console.log('API Response:', result); // Debug log
        
        if (result.meta.requestStatus === 'fulfilled') {
          toast.success('Lead created successfully!');
          navigate('/leads');
        } else {
          const errorMsg = result?.payload?.message || result.payload || 'Failed to create lead';
          toast.error(errorMsg);
          console.error('Create Error:', result);
        }
      }
    } catch (error) {
      console.error('Submit Error:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name Field */}
        <Input
          label="Full Name *"
          placeholder="Enter full name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (formErrors.name) setFormErrors((prev) => ({ ...prev, name: undefined }));
          }}
          error={formErrors.name}
          icon={<User className="w-4 h-4 text-gray-400" />}
        />

        {/* Email Field */}
        <Input
          label="Email Address *"
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (formErrors.email) setFormErrors((prev) => ({ ...prev, email: undefined }));
          }}
          error={formErrors.email}
          icon={<Mail className="w-4 h-4 text-gray-400" />}
        />

        {/* Phone Field */}
        <Input
          label="Phone"
          type="tel"
          placeholder="+91 98765 43210"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            if (formErrors.phone) setFormErrors((prev) => ({ ...prev, phone: undefined }));
          }}
          error={formErrors.phone}
          icon={<Phone className="w-4 h-4 text-gray-400" />}
        />

        {/* Company Field */}
        <Input
          label="Company"
          placeholder="Company name"
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
            if (formErrors.company) setFormErrors((prev) => ({ ...prev, company: undefined }));
          }}
          error={formErrors.company}
          icon={<Building2 className="w-4 h-4 text-gray-400" />}
        />

        {/* ✅ Status Dropdown - Fixed Options */}
        <Select
          label="Status *"
          options={STATUS_OPTIONS}  // ✅ Direct array se mapping hoga
          value={status}
          onChange={(e) => {
            const val = e.target.value; // ✅ Direct value liya
            setStatus(val);
            if (formErrors.status) setFormErrors((prev) => ({ ...prev, status: undefined }));
          }}
          error={formErrors.status}
          placeholder="Select status"
        />

        {/* ✅ Source Dropdown - Fixed Options */}
        <Select
          label="Source *"
          options={SOURCE_OPTIONS} // ✅ Direct array
          value={source}
          onChange={(e) => {
            const val = e.target.value; // ✅ Direct value
            setSource(val);
            if (formErrors.source) setFormErrors((prev) => ({ ...prev, source: undefined }));
          }}
          error={formErrors.source}
          placeholder="Select source"
        />
      </div>

      {/* Notes Textarea */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <textarea
          placeholder="Add any notes about this lead..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
        />
      </div>

      {/* Error Display (General) */}
      {Object.keys(formErrors).length > 0 && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          Please fill in all required fields marked with *
        </div>
      )}

      {/* Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <Button 
          type="submit" 
          loading={loading}
          disabled={loading}
          className="min-w-[140px]"
        >
          <Save className="w-4 h-4 mr-2" />
          {isEdit ? 'Update Lead' : 'Create Lead'}
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