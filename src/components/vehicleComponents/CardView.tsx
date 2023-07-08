import React from 'react';
import { Vehicle } from '../../types/vehicleTypes';
import Button from '../Button';

interface CardViewProps {
  vehicles: Vehicle[];
  onDelete: (id: string) => void;
  onShow: (id: string) => void;
  onUpdate: (id: string) => void;
}

const CardView: React.FC<CardViewProps> = ({ vehicles, onDelete, onShow, onUpdate }) => {
  if (!Array.isArray(vehicles) || vehicles.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">No Vehicles</span>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      {vehicles.map((vehicle) => (
        <div className="col-md-4" key={vehicle._id}>
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">{vehicle.model}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{vehicle.manufacturer}</h6>
              <h6 className="card-subtitle mb-2 text-muted">{vehicle.year}</h6>\
              <h6 className="card-subtitle mb-2 text-muted">{vehicle.price}</h6>
              <h6 className="card-subtitle mb-2 text-muted">{vehicle.desc}</h6>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <Button
                buttonStyle="btn btn-outline-primary btn-sm"
                onClick={() => onShow(vehicle._id)}
              >
                SHOW
              </Button>
              <Button
                buttonStyle="btn btn-outline-warning btn-sm"
                onClick={() => onUpdate(vehicle._id)}
              >
                UPDATE
              </Button>
              <Button
                buttonStyle="btn btn-outline-danger btn-sm"
                onClick={() => onDelete(vehicle._id)}
              >
                DELETE
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardView;
