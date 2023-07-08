import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getVehicles, deleteVehicle, searchVehicles } from '../../service/vehicleAPI';
import { Vehicle } from '../../types/vehicleTypes';
import Button from '../Button';
import CardView from './CardView';
import TableView from './TableView';
import TablePagination from '../tableComponents/TablePagination';
import Search from '../Search';
import Swal from 'sweetalert2';

interface VehicleListProps {
  viewType: 'table' | 'card';
}

const VehicleList: React.FC<VehicleListProps> = ({ viewType }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(1);

  const navigateTo = useNavigate();

  // Retrieve data Function
  useEffect(() => {
    fetchVehicles(currentPage);
  }, [currentPage]);

  const fetchVehicles = async (page: number) => {
    try {
      const response = await getVehicles({ page });
      setVehicles(response.data);
      setTotalPages(response.totalPages);
      setRowsPerPage(response.limit);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  // Search Function
  const handleSearchClick = async (searchQuery: string) => {
    try {
      const response: Vehicle[] = await searchVehicles(searchQuery);
      setVehicles(response);
      if (response.length === 0) {
        Swal.fire({
          icon: 'info',
          title: 'Vehicles Not Found!',
        }).then(() => {
          fetchVehicles(currentPage);
        });
      }
    } catch (error) {
      console.error('Error searching vehicles:', error);
    }
  };

  // Show Function
  const handleShowClick = (id: string) => {
    navigateTo(`/vehicleitem/${id}`);
  };

  // Update Function
  const handleUpdateClick = (id: string) => {
    navigateTo(`/updatevehicle/${id}`);
  };

  // Delete Function
  const handleDeleteClick = async (id: string) => {
    try {
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
          handleDeleteConfirmation(id);
        }
      });
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const handleDeleteConfirmation = async (id: string) => {
    try {
      await deleteVehicle(id);
      const updatedVehicles = vehicles.filter(vehicle => vehicle._id !== id);
      setVehicles(updatedVehicles);
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Your blog has been deleted.',
        showConfirmButton: false,
        timer: 1000,
      });

      // Check if the current page's vehicles are empty
      if (updatedVehicles.length === 0 && currentPage > 1) {
        const previousPage = currentPage - 1;
        fetchVehicles(previousPage);
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      Swal.fire('Error', 'An error occurred while deleting the vehicle.', 'error');
    }
  };

  // Pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderView = () => {

    if (viewType === 'table') {
      return (
        <TableView
          vehicles={vehicles}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          handleShowClick={handleShowClick}
          handleUpdateClick={handleUpdateClick}
          handleDeleteClick={handleDeleteClick}
        />
      );
    } else if (viewType === 'card') {
      return <CardView vehicles={vehicles} onDelete={handleDeleteClick} onShow={handleShowClick} onUpdate={handleUpdateClick} />;
    }

    return null;
  };

  return (
    <>
      <div className="d-flex justify-content-end">
        <Link to="/newvehicle">
          <Button buttonStyle={'btn btn-primary'}>NEW VEHICLE</Button>
        </Link>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h1 className="text-center">VEHICLES</h1>
        </div>
        <div>
          <Search onSearch={handleSearchClick} />
        </div>
      </div>
      {renderView()}
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default VehicleList;
