import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SpNavbar from '../SpNavbar/SpNavbar';
import './SpProfilePage.css';

const SpProfilePage = () => {
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
    <div className='main-content'>
        <SpNavbar user={user} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        </div>
      <p>Welcome, {user.username}!</p>
      <p>Email: {user.emailaddress}</p>
      <p>First Name: {user.firstname}</p>
      <p>Last Name: {user.lastname}</p>
      <p>Phone: {user.mobile}</p>
      <p>Sex: {user.sex}</p>
      <p>Role: {user.role}</p>
      <p>Address 1: {user.address1}</p>
      <p>Address 2: {user.address2}</p>
      <p>City: {user.city}</p>
      <p>State: {user.state}</p>
      <p>Zipcode: {user.zipcode}</p>
    </div>
  );
};

export default SpProfilePage;
