import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

interface TableProps {
  data: any[];
  bodyColumns: string[];
  headColumns : string[];
  renderActionColumn: (row: any) => React.ReactNode;
  currentPage : number;
  rowsPerPage : number;
  
}

const Table: React.FC<TableProps> = ({ data, bodyColumns, headColumns, renderActionColumn, currentPage, rowsPerPage }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">No Blogs</span>
        </div>
      </div>
    );
  }

  return (
    <table className="table table-striped table-hover">
      <TableHeader columns={headColumns} />
      <TableBody data={data} columns={bodyColumns} renderActionColumn={renderActionColumn} currentPage={currentPage} rowsPerPage={rowsPerPage}/>
    </table>
  );
};

export default Table;
