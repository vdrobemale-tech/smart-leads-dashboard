import { Download } from 'lucide-react';

import { useLeads } from '../../hooks/useLeads';

import { downloadCSV } from '../../utils/exportCSV';

import Button from '../common/Button';

import toast from 'react-hot-toast';

const ExportCSVButton = () => {
  const { exportCSV } = useLeads();

  const handleExport = async () => {
    try {
      // ✅ FIXED
      const result = await exportCSV();

      // ✅ payload extract
      const data =
        (result as any)?.payload || '';

      if (!data) {
        toast.error(
          'No data available'
        );
        return;
      }

      downloadCSV(data, 'leads.csv');

      toast.success(
        'CSV exported successfully!'
      );
    } catch (error) {
      console.error(error);

      toast.error(
        'Failed to export CSV'
      );
    }
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={handleExport}
    >
      <Download className="w-4 h-4 mr-2" />
      Export CSV
    </Button>
  );
};

export default ExportCSVButton;