import { useEffect, useState } from 'react';
import { getUserProfile, deleteUserProfile} from '../../service/userAPI';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Swal from 'sweetalert2';

interface UserProfileData {
  id: string;
  name: string;
  phone: number;
  email: string;
  // Add other properties from the user profile
}

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
          const response = await getUserProfile(accessToken);
          setUserProfile(response.user);
        } else {
          navigateTo('/login');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateClick = () => {
    navigateTo('/profileupdate');
  };

  const handleDeleteClick = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleDeleteConfirmation(id);
      }
    });
  };

  const handleDeleteConfirmation = async (id: string) => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        await deleteUserProfile(accessToken);

        Swal.fire({
          icon: 'success',
          title: 'Come Again!',
          text: 'Your profile has been removed',
          showConfirmButton: false,
          timer: 1000
        });

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigateTo('/');

      } else {
        console.error('Access token not found.');
      }
    } catch (error) {
      console.error('Error deleting user profile:', error);
      Swal.fire(
        'Error',
        'An error occurred while deleting the profile.',
        'error'
      );
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            {userProfile && (
              <>
                <Card header={<h2>{userProfile.name}</h2>}>
                <p>Name: {userProfile.name}</p>
                  <p>Email: {userProfile.email}</p>
                  <p>Phone: {userProfile.phone} </p>
                  <div className="row justify-content-center mt-3">
                    <div className="col-md-6">
                      <Button
                        buttonStyle={'btn btn-outline-warning btn-block'}
                        onClick={() => handleUpdateClick()}
                      >
                        UPDATE
                      </Button>
                    </div>
                  </div>
                </Card>
                <br/>
                <Card header={<h4>CANCEL ACCOUNT</h4>} >
                  <div className="row justify-content-center mt-3">
                    <div className="col-md-6">
                      <Button
                        buttonStyle={'btn btn-outline-danger btn-block'}
                        onClick={() => handleDeleteClick(userProfile.id)}
                      >
                        DELETE ACCOUNT
                      </Button>
                    </div>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
