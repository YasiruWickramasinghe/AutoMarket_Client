import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./templates/Navbar"

import Home from "./pages/Home"
import About from "./pages/About"
import UserLogin from './pages/userPages/UserLogin';
import UserRegister from './pages/userPages/UserRegister';
import UserProfile from './pages/userPages/UserProfile';
import UsersView from './pages/userPages/UsersView';
import UserUpdate from './pages/userPages/UserUpdate';

import Footer from './templates/Footer';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <div className="container mt-3 mb-5">
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/users" Component={UsersView} />
          <Route path="/register" Component={UserRegister} />
          <Route path="/login" Component={UserLogin} />
          <Route path="/profile" Component={UserProfile} />
          <Route path="/profileupdate" Component={UserUpdate} />
          <Route path="/about" Component={About} />
        </Routes>
        </div>
        <Footer/>
      </Router>
    </>
  )
}

export default App
