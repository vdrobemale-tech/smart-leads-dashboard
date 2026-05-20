import { PlusCircle } from 'lucide-react';
import LeadForm from '../../components/forms/LeadForm';

const CreateLeadPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <PlusCircle className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Lead</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Fill in the details to add a new lead
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <LeadForm />
      </div>
    </div>
  );
};

export default CreateLeadPage;