// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import SignUpPage from './Components/Signup/Signuppage';
import LandingPage from './Components/LandingPage/landingpage';
import LoginPage from './Components/Login/login';
import DashboardPage from './Components/Dashboard/dashboard';
import SPDashboardPage from './Components/Dashboard/dashboardsp';
import CSTRDashboardPage from './Components/Dashboard/dashboardcstr';
import SpProfilePage from './Components/ServiceProvider/SpProfile/SpProfilePage';
import SPSideNavbar from './Components/ServiceProvider/SpSideNav/SPSideNavbar';
import UpcomingBookings from './Components/ServiceProvider/Bookings/UpcomingBookings';
import OngoingBookings from './Components/ServiceProvider/Bookings/OngoingBookings';
import PastBookings from './Components/ServiceProvider/Bookings/PastBookings';
import SpProfileUpdatePage from './Components/ServiceProvider/SpProfile/SpProfileUpdate';
import CstrProfile from './Components/Customer/CstrProfile/CstrProfile';
import CstrNavbar from './Components/Customer/CstrNavbar/CstrNavbar';
import AddService from './Components/ServiceProvider/Bookings/AddService';
import ListService from './Components/ServiceProvider/Bookings/ListService';
import ModifyService from './Components/ServiceProvider/Bookings/ModifyService';
import BookService from './Components/Customer/BookService/BookService';

function App() {
  return (
  <Router>
    <div className="App">
      <header className="App-header">
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route
              path="/spdashboard"
              element={
                <SPDashboardPage>
                  <SPSideNavbar />
                </SPDashboardPage>
              }
            />
            <Route path="/upcoming-bookings" element={<UpcomingBookings /> } />
            <Route path="/ongoing-bookings" element={<OngoingBookings /> } />
            <Route path="/past-bookings" element={<PastBookings /> } />
            <Route 
              path="/cstrdashboard" 
              element={
                <CSTRDashboardPage>
                  <CstrNavbar />
                </CSTRDashboardPage>
              } 
            />
            <Route path="/spprofilepage" element={<SpProfilePage />} />
            <Route path="/edit-profile" element={<SpProfileUpdatePage />} />
            <Route path="/cstrprofilepage" element={<CstrProfile />} />
            <Route path="/add-service" element={<AddService />} />
            <Route path="/list-service" element={<ListService />} />
            <Route path="/modify-service/:ServiceCatalog_Id" element={<ModifyService />} /> 
            <Route path = "/book-service" element = {<BookService/>} />
         </Routes>
      </header>
    </div>
    </Router>
  );
}

export default App;
