import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import FormField from '../../components/formComponents/FormField';
import Card from '../../components/Card';
import { registerUser } from '../../service/userAPI';
import Swal from 'sweetalert2';
import Button from '../../components/Button';

type RegisterFormData = {
  name: string;
  email: string;
  phone: number;
  password: string;
};

const UserRegister: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegisterFormData>();
  const [registrationError, setRegistrationError] = useState<string | null>('');
  const [submissionCompleted, setSubmissionCompleted] = useState(false);
  const navigateTo = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);

      Swal.fire({
        icon: 'success',
        title: 'Registered!',
        text: "You are Successfully Registred",
        showConfirmButton: false,
        timer: 1000,
      });

      // Clear form fields
      reset();

      // Show submission completed message
      setSubmissionCompleted(true);

      // Reset message after 0.5 seconds
      setTimeout(() => {
        setSubmissionCompleted(false);
        navigateTo('/login');
      }, 500);
    } catch (error: any) {

      if (error.response.status === 400) {
        const errorData = error.response.data;
        if (errorData.error) {
          setRegistrationError(errorData.error);
        } else if (errorData.errors && errorData.errors.length > 0) {
          const errorMessage = errorData.errors[0].msg;
          setRegistrationError(errorMessage);
        } else {
          setRegistrationError('Registration failed. Please try again.');
        }
      } 
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <Card header={<h2>REGISTER</h2>}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormField
                label="Name"
                name="name"
                register={register('name', { required: 'Name is required' })}
                error={errors.name}
              />
              <FormField
                label="Email"
                name="email"
                register={register('email', { required: 'Email is required' })}
                error={errors.email}
              />
              <FormField
                label="Phone"
                name="phone"
                register={register('phone', { required: 'Phone is required' })}
                error={errors.phone}
              />
              <FormField
                label="Password"
                name="password"
                type="password"
                register={register('password', { required: 'Password is required' })}
                error={errors.password}
              />
              {registrationError && <p className="text-danger small">{registrationError}</p>}
              <div className="d-flex justify-content-center mt-5">
                <Button onClick={handleSubmit(onSubmit)} buttonStyle={'btn btn-success btn-block'}>
                  REGISTER
                </Button>
              </div>
              {submissionCompleted}
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
