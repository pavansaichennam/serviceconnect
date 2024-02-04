// CstrSideNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './CstrSideNavbar.css';

const CstrSideNavbar = ( {user} ) => {
  return (
    <div className="sidenav">
      <div className="sidenav-heading">
        <span className="sidenav-heading-span"><b>Dashboard</b></span>
      </div>
      <div className="sidenav-ul">
        <ul className="nav-list">
        <li>
            <Link to='/cstrprofilepage' className="nav-link" state={ { user } }>Update Profile</Link>
          </li>
          <li>
            <Link to='/book-service' className="nav-link" state={ { user } }>Book a Service</Link>
          </li>
          <li>
            <Link to='/cstrprofilepage' className="nav-link" state={ { user } }>Bookings</Link>
          </li>
          <li>
            <Link to='/cstrprofilepage' className="nav-link" state={ { user } }>Calendar</Link>
          </li>
          {/* Add other navigation links here */}
        </ul>
      </div>
    </div>
  );
};

export default CstrSideNavbar;