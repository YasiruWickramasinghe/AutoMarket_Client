import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getVehicleById, deleteVehicle } from '../../service/vehicleAPI';
import { Vehicle } from '../../types/vehicleTypes';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const VehicleItem: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const navigateTo = useNavigate();

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                if (id) {
                    const response: Vehicle = await getVehicleById(id);
                    setVehicle(response);
                }
            } catch (error) {
                console.error('Error fetching vehicle:', error);
            }
        };
        fetchVehicle();
    }, [id]);

    const handleUpdateClick = (id: string) => {
        // Redirect to the UpdateVehicle page with the vehicle ID in the URL
        navigateTo(`/updatevehicle/${id}`);
    };

    const handleDeleteClick = async (id: string) => {
        try {
            // Show SweetAlert confirmation dialog
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Delete the vehicle
                    handleDeleteConfirmation(id);
                }
            });
        } catch (error) {
            console.error('Error deleting vehicle:', error);
        }
    };

    const handleDeleteConfirmation = (id: string) => {
        // Perform the delete operation
        deleteVehicle(id)
            .then(() => {
                navigateTo('/vehiclestableview');

                // Show success message
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: "Your vehicle has been deleted.",
                    showConfirmButton: false,
                    timer: 1000,
                });
            })
            .catch((error) => {
                console.error('Error deleting vehicle:', error);
                // Show error message
                Swal.fire(
                    'Error',
                    'An error occurred while deleting the vehicle.',
                    'error'
                );
            });
    };



    return (
        <>
            <div className="container">
                <Link to="/vehiclestableview">
                    <Button buttonStyle={'btn btn-outline-secondary btn-sm'}>Back</Button>
                </Link>
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <Card header="VEHICLE DETAILS">
                            {vehicle ? (
                                <>
                                    <h2 className="text-center">{vehicle.model}</h2>
                                    <p>Name: {vehicle.manufacturer}</p>
                                    <p>Author: {vehicle.year}</p>
                                    <p>Author: {vehicle.price}</p>
                                    <p>Author: {vehicle.desc}</p>
                                </>
                            ) : (
                                <p>Loading vehicle...</p>
                            )}
                            <div className="row justify-content-center mt-3">
                                <div className="col-md-6">
                                    <Button
                                        buttonStyle={'btn btn-outline-warning btn-block'}
                                        onClick={() => handleUpdateClick(id!)}
                                    >
                                        UPDATE
                                    </Button>

                                </div>
                                <div className="col-md-6">
                                    <Button
                                        buttonStyle={'btn btn-outline-danger btn-block'}
                                        onClick={() => handleDeleteClick(id!)}
                                    >
                                        DELETE
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VehicleItem;
