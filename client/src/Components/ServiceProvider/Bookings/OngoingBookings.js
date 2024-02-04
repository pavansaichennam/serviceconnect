// OngoingBookings.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import SpNavbar from '../SpNavbar/SpNavbar';
import SpSideNavbar from '../SpSideNav/SPSideNavbar';
import './UpcomingBookings.css';

const OngoingBookings = () => {
  const location = useLocation();
  const { user } = location.state || {};

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
    <div className="upcoming-bookings-container">
      <h1>Ongoing Bookings</h1>
      <p>Welcome, {user.username}!</p>
      <p>Email: {user.emailaddress}</p>
      {/* Add other content related to Upcoming Bookings */}
    </div>
    </div>
  );
};

export default OngoingBookings;
