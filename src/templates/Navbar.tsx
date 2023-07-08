import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { logoutUser, getUserProfile } from '../service/userAPI';
import Swal from 'sweetalert2';

function Navbar() {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('accessToken') !== null;
  const navigateTo = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const [error, setError] = useState('');

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          const { user } = await getUserProfile(accessToken);
          setIsAdmin(user.role === 'admin');
        }
      } catch (error) {
        setError('Failed to fetch user profile. Please try again.');
      }
    };

    if (isLoggedIn) {
      checkAdminStatus();
    }
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        await logoutUser(accessToken);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        Swal.fire({
            icon: 'success',
            title: 'Logged out!',
            text: 'Come Again',
            showConfirmButton: false,
            timer: 1000,
          });
      }
      navigateTo('/');
    } catch (error) {
      setError('Logout failed. Please try again.');
    }
  };
  
  

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink className="navbar-brand" to="/">
        USER MANAGEMENT
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              HOME
            </NavLink>
          </li>
          {isAdmin && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/users">
                USERS
              </NavLink>
            </li>
          )}
          <li className="nav-item">
            <NavLink className="nav-link" to="/about">
              ABOUT
            </NavLink>
          </li>
        </ul>
        {isLoggedIn ? (
          <ul className="navbar-nav ml-auto text-right">
            <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  PROFILE
                </NavLink>
              </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={handleLogout}>
                LOGOUT
              </button>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav ml-auto text-right">
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                LOGIN
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                SIGNUP
              </NavLink>
            </li>
          </ul>
        )}
      </div>
      {error && <p className="text-danger">{error}</p>}
    </nav>
  );
}

export default Navbar;
