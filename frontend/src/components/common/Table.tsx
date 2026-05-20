import { ReactNode } from 'react';

interface Column<T> {
  header: string;
  accessor: string;
  render?: (row: T) => ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}

const Table = <T extends { _id?: string; id?: string }>({
  columns,
  data,
}: TableProps<T>) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {data.map((row, rowIndex) => (
            <tr
              key={(row as any)._id || (row as any).id || rowIndex}
              className="hover:bg-gray-50 transition-colors"
            >
              {columns.map((col) => (
                <td
                  key={col.accessor}
                  className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap"
                >
                  {col.render
                    ? col.render(row)
                    : (row as any)[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;