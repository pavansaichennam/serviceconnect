import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p><h1>Admin Dashboard</h1></p>
      </div>
        <h2>Welcome, {user.username}!</h2>
      <p>Email: {user.emailaddress}</p>
      <p>Role: {user.role}</p>
      {/* Display other user details as needed */}
      <button onClick={handleLogout}>Logout</button>
    </div>
    
  );
};

export default DashboardPage;
