import React, { ReactNode } from 'react';

type CardProps = {
  header: ReactNode;
  children: ReactNode;
};

const Card: React.FC<CardProps> = ({ header, children }) => {
  return (
    <div className="card">
      <div className="card-header text-center">
        {header}
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

export default Card;
