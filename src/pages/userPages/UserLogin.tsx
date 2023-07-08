import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import { loginUser } from '../../service/userAPI';
import Swal from 'sweetalert2';
import Button from '../../components/Button';
import FormField from '../../components/formComponents/FormField';

type LoginFormData = {
  email: string;
  password: string;
};

const UserLogin: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginFormData>();
  const [loginError, setLoginError] = useState<string | null>('');
  const navigateTo = useNavigate();
  const [submissionCompleted, setSubmissionCompleted] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { accessToken, refreshToken } = await loginUser(data.email, data.password);

      // Save the tokens to localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      Swal.fire({
        icon: 'success',
        title: 'Logged In!',
        text: 'You are successfully logged in',
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
        navigateTo('/profile');
      }, 500);
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
          <Card header={<h2>LOGIN</h2>}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormField
                label="Email"
                name="email"
                register={register('email', { required: 'Email is required' })}
                error={errors.email}
              />
              <FormField
                label="Password"
                name="password"
                type="password"
                register={register('password', { required: 'Password is required' })}
                error={errors.password}
              />
              {loginError && <p className="text-danger small">{loginError}</p>}
              <div className="d-flex justify-content-center mt-5">
                <Button type="submit" buttonStyle="btn btn-success btn-block">
                  LOGIN
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

export default UserLogin;
