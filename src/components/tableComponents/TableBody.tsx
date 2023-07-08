import React from 'react';

interface TableBodyProps {
  data: any[];
  columns: string[];
  renderActionColumn: (row: any) => React.ReactNode;
  currentPage: number;
  rowsPerPage: number;
}

const TableBody: React.FC<TableBodyProps> = ({ data, columns, renderActionColumn, currentPage, rowsPerPage }) => {
  const startIndex = (currentPage - 1) * rowsPerPage;

  return (
    <tbody>
      {data.map((row, rowIndex) => {
        const index = startIndex + rowIndex + 1;
        return (
          <tr key={rowIndex}>
            {columns.map((column, columnIndex) => {
              if (column === 'Action') {
                return (
                  <td key={columnIndex}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      {renderActionColumn(row)}
                    </div>
                  </td>
                );
              } else if (column === 'id') {
                return <td key={columnIndex}>{index}</td>;
              } else {
                return <td key={columnIndex}>{row[column]}</td>;
              }
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
