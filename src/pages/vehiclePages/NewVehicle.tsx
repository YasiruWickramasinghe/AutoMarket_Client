import React from 'react';
import VehicleForm from '../../components/vehicleComponents/VehicleForm';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const NewVehicle: React.FC = () => {
  return (
    <div className="container">
      <Link to="/vehiclestableview">
        <Button buttonStyle={'btn btn-outline-secondary btn-sm mb-3'}>Back</Button>
      </Link>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <Card header={<h2>CREATE VEHICLE</h2>}>
            <VehicleForm />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewVehicle;
