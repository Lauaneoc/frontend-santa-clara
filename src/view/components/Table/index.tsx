// src/components/Table.tsx
interface TableColumn<T> {
  key: keyof T;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Array<TableColumn<T>>;
  onRowClick?: (item: T) => void; // Função para lidar com o clique na linha
}

export function Table<T>({ data, columns, onRowClick }: TableProps<T>) {
  return (
      <div className="px-4 sm:px-6 lg:px-8">
          <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-300">
                              <thead className="bg-gray-50">
                                  <tr>
                                      {columns.map((column) => (
                                          <th
                                              key={String(column.key)}
                                              scope="col"
                                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                                          >
                                              {column.header}
                                          </th>
                                      ))}
                                  </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 bg-white">
                                  {data.map((item, index) => (
                                      <TableRow
                                          key={index}
                                          item={item}
                                          columns={columns}
                                          onRowClick={onRowClick} // Passa a função onRowClick
                                      />
                                  ))}
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}

interface TableRowProps<T> {
  item: T;
  columns: Array<TableColumn<T>>;
  onRowClick?: (item: T) => void; // Função para lidar com o clique na linha
}

function TableRow<T>({ item, columns, onRowClick }: TableRowProps<T>) {
  return (
      <tr onClick={() => onRowClick && onRowClick(item)} className="cursor-pointer hover:bg-gray-100">
          {columns.map((column) => (
              <td key={String(column.key)} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {column.render ? column.render(item) : String(item[column.key])}
              </td>
          ))}
      </tr>
  );
}
