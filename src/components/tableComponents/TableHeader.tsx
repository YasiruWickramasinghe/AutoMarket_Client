import React from 'react';

interface TableHeaderProps {
    columns: string[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ columns }) => {
    return (
        <thead className="thead-dark">
            <tr>
                {columns.map((column, index) => {
                    return <th scope="col" key={index}>{column}</th>;
                })}
            </tr>
        </thead>
    );
};

export default TableHeader;
