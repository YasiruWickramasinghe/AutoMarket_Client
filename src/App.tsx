import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./templates/Navbar"

import Home from "./pages/Home"
import About from "./pages/About"
import Footer from './templates/Footer';

//User Routes
import UserLogin from './pages/userPages/UserLogin';
import UserRegister from './pages/userPages/UserRegister';
import UserProfile from './pages/userPages/UserProfile';
import UsersView from './pages/userPages/UsersView';
import UserUpdate from './pages/userPages/UserUpdate';

//Vehicle Routes
import VehiclesTableView from './pages/vehiclePages/VehiclesTableView';
import VehiclesCardView from './pages/vehiclePages/VehiclesCardView';
import NewVehicle from './pages/vehiclePages/NewVehicle';
import UpdateVehicle from './pages/vehiclePages/UpdateVehicle';
import VehicleItem from './pages/vehiclePages/VehicleItem';
import UserVehicle from './pages/vehiclePages/UserVehicle';



function App() {

  return (
    <>
      <Router>
        <Navbar />
        <div className="container mt-3 mb-5">
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/users" Component={UsersView} />
            <Route path="/about" Component={About} />

            <Route path="/register" Component={UserRegister} />
            <Route path="/login" Component={UserLogin} />
            <Route path="/profile" Component={UserProfile} />
            <Route path="/profileupdate" Component={UserUpdate} />

            <Route path="/vehiclestableview" Component={VehiclesTableView} />
            <Route path="/vehiclescardview" Component={VehiclesCardView} />
            <Route path="/newvehicle" Component={NewVehicle} />
            <Route path="/updatevehicle/:id" Component={UpdateVehicle} />
            <Route path="/vehicleitem/:id" Component={VehicleItem} />
            <Route path="/myvehicles" Component={UserVehicle} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  )
}

export default App
