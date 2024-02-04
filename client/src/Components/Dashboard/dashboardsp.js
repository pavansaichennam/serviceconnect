import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SpNavbar from '../ServiceProvider/SpNavbar/SpNavbar';
import SpSideNavbar from '../ServiceProvider/SpSideNav/SPSideNavbar';
import './dashboardsp.css';

const DashboardPage = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user information and redirect to login page
    navigate('/login', { state: { user: null } });
  };

  if (!user) {
    // Handle case where user details are not available
    return (
      <div>
        <p>User details not available.</p>
      </div>
    );
  }

  return (
    <div>
        <SpNavbar user={user} />
        <SpSideNavbar user={user} />
      <div className="main-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Service Provider Dashboard</h1> <br></br>
        </div>
        <p>Welcome, {user.username}!</p>
        <p>Email: {user.emailaddress}</p>
        <p>Role: {user.role}</p>
        {/* Display other user details as needed */}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default DashboardPage;
