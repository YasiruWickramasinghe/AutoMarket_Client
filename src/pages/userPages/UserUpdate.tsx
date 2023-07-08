import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateUserProfile, getUserProfile } from '../../service/userAPI';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';
import FormField from '../../components/formComponents/FormField';
import Swal from 'sweetalert2';

type UpdateUserData = {
  name: string;
  email: string;
  phone: number;
  oldPassword: string;
  newPassword: string;
};

const UpdateUser: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<UpdateUserData>();
  //const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();
  const [loginError, setLoginError] = useState<string | null>('');
  const [submissionCompleted, setSubmissionCompleted] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
          const response = await getUserProfile(accessToken);
          const { name, email, phone } = response.user;
          setValue('name', name);
          setValue('email', email);
          setValue('phone', phone);
        } else {
          navigateTo('/login');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [setValue, navigateTo]);

  const onSubmit = async (data: UpdateUserData) => {
    try {
      //setLoading(true);
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        await updateUserProfile(data, accessToken);
        //setLoading(false);

        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated!',
          text: 'Your profile has been updated successfully.',
          showConfirmButton: false,
          timer: 1500
        });

        // Clear form fields
        reset();

        // Show submission completed message
        setSubmissionCompleted(true);

        // Reset message after 0.5 seconds
        setTimeout(() => {
          setSubmissionCompleted(false);
          navigateTo('/profile');
        }, 500);

      } else {
        console.error('Access token not found.');
      }
    } catch (error: any) {

      if (error.response.status === 400 || error.response.status === 404 || error.response.status === 401) {
        const errorData = error.response.data;
        if (errorData.error) {
          setLoginError(errorData.error);
        } else if (errorData.errors && errorData.errors.length > 0) {
          const errorMessage = errorData.errors[0].msg;
          setLoginError(errorMessage);
        } else {
          setLoginError('Login failed. Please try again.');
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <Card header={<h2>UPDATE PROFILE</h2>}>
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
                label="phone"
                name="phone"
                register={register('phone', { required: 'Phone is required' })}
                error={errors.phone}
              />
              <FormField
                label="Old Password"
                name="oldPassword"
                type="password"
                register={register('oldPassword')}
                error={errors.oldPassword}
              />
              <FormField
                label="New Password"
                name="newPassword"
                type="password"
                register={register('newPassword')}
                error={errors.newPassword}
              />
              {loginError && <p className="text-danger">{loginError}</p>}
              <div className="row justify-content-center mt-3">
                <div className="col-md-6">
                  <Button
                    type="submit"
                    buttonStyle="btn btn-success btn-block"

                  >
                    UPDATE
                  </Button>
                </div>
              </div>
              {submissionCompleted}
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
