import React, { useEffect, useState } from 'react';
import VehicleForm from '../../components/vehicleComponents/VehicleForm';
import Card from '../../components/Card';
import { useParams } from 'react-router-dom';
import { getVehicleById } from '../../service/vehicleAPI';
import { Vehicle } from '../../types/vehicleTypes';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';


const UpdateVehicle: React.FC = () => {
  const { id } = useParams<{ id?: string }>();

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      if (id) {
        try {
          const fetchedVehicle = await getVehicleById(id);
          setVehicle(fetchedVehicle);
        } catch (error) {
          console.error('Error fetching vehicle:', error);
          // Handle error if necessary
        }
      }
    };

    fetchVehicle();
  }, [id]);

  return (
    <div className="container">
      <Link to="/vehiclestableview">
        <Button buttonStyle={'btn btn-outline-secondary btn-sm mb-3'}>Back</Button>
      </Link>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <Card header={<h2>UPDATE VEHICLE</h2>}>
            {vehicle && <VehicleForm isUpdateForm initialData={vehicle} />}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UpdateVehicle;
