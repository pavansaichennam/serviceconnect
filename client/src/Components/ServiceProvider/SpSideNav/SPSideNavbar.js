// SPSideNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './SPSideNavbar.css';

const SPSideNavbar = ( {user} ) => {
  return (
    <div className="sidenav">
      <div className="sidenav-heading">
        <span className="sidenav-heading-span"><b>Dashboard</b></span>
      </div>
      <div className="sidenav-ul">
        <ul className="nav-list">
        <li>
            <Link to='/edit-profile' className="nav-link" state={ { user } }>Update Profile</Link>
          </li>
          <li>
            <Link to='/add-service' className="nav-link" state={ { user } }>Add Service</Link>
          </li>
          <li>
            <Link to='/list-service' className="nav-link" state={ { user } }>Services</Link>
          </li>
          <li>
            <Link to='/past-bookings' className="nav-link" state={ { user } }>Past Bookings</Link>
          </li>
          {/* Add other navigation links here */}
        </ul>
      </div>
    </div>
  );
};

export default SPSideNavbar;