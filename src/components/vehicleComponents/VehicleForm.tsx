import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import FormField from '../formComponents/FormField';
import Button from '../Button';
import Swal from 'sweetalert2';
import { createVehicle, updateVehicle } from '../../service/vehicleAPI';
import { Vehicle } from '../../types/vehicleTypes';

type FormData = {
  manufacturer: string;
  model: string;
  year: number;
  price: number;
  desc: string;
};

type VehicleFormProps = {
  isUpdateForm?: boolean;
  initialData?: Vehicle;
};

const VehicleForm: React.FC<VehicleFormProps> = ({ isUpdateForm = false, initialData }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [submissionCompleted, setSubmissionCompleted] = useState(false);
  const navigateTo = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      if (isUpdateForm && initialData && initialData._id) {
        // Update the Vehicle
        await updateVehicle(initialData._id, data);

        // Show update completed message
        Swal.fire({
          icon: 'warning',
          title: 'Updated!',
          text: "Your Vehicle has been updated.",
          showConfirmButton: false,
          timer: 1000,
        });

      } else {
        // Create the Vehicle
        await createVehicle(data);

        // Show creation completed message
        Swal.fire({
          icon: 'success',
          title: 'Created!',
          text: "Your Vehicle has been created.",
          showConfirmButton: false,
          timer: 1000,
        });
      }

      // Clear form fields
      reset();

      // Show submission completed message
      setSubmissionCompleted(true);

      // Reset message after 2 seconds
      setTimeout(() => {
        setSubmissionCompleted(false);
        navigateTo('/vehiclestableview');
      }, 2000);
    } catch (error) {
      console.error('Error creating/updating vehicle:', error);
      // Handle error if necessary
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField
        label="Manufacturer"
        name="manufacturer"
        defaultValue={isUpdateForm && initialData ? initialData.manufacturer : ''}
        register={register('manufacturer', { required: 'Manufacturer is required' })}
        error={errors.manufacturer}
      />
      <FormField
        label="Model"
        name="model"
        defaultValue={isUpdateForm && initialData ? initialData.model : ''}
        register={register('model', { required: 'Model is required' })}
        error={errors.model}
      />
      <FormField
        label="Year"
        name="year"
        defaultValue={isUpdateForm && initialData ? initialData.year.toString() : ''}
        register={register('year', { required: 'Year is required' })}
        error={errors.year}
      />
      <FormField
        label="Price"
        name="price"
        defaultValue={isUpdateForm && initialData ? initialData.price.toString() : ''}
        register={register('price', { required: 'Price is required' })}
        error={errors.price}
      />
      <FormField
        label="Desc"
        name="desc"
        defaultValue={isUpdateForm && initialData ? initialData.desc : ''}
        register={register('desc', { required: 'Description is required' })}
        error={errors.desc}
      />

      <div className="d-flex justify-content-center mt-5">
        <Button onClick={handleSubmit(onSubmit)} buttonStyle={`btn btn-outline-${isUpdateForm ? 'warning' : 'success'} btn-block`}>
          {isUpdateForm ? 'UPDATE' : 'CREATE'}
        </Button>
      </div>


      {submissionCompleted}
    </form>
  );
};

export default VehicleForm;
