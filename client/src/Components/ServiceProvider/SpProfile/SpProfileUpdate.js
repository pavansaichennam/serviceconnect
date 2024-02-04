import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import SpNavbar from '../SpNavbar/SpNavbar';
import SPSideNavbar from '../SpSideNav/SPSideNavbar';
import './SpProfilePage.css';

const SpProfileUpdatePage = () => {
  const location = useLocation();
  const { user: initialUser } = location.state || {};
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);


  // Use state to manage the editable user details
  const [user, setUser] = useState(initialUser);

  const handleLogout = () => {
    // Clear user information and redirect to the login page
    navigate('/login', { state: { user: null } });
  };

  const handleInputChange = (e) => {
    // Update the user state when input fields change
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/userupdate/${user.id}`, user, {
        headers: { 'Content-Type': 'application/json' },
      });
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error('Error during request:', error.response ? error.response.data : error.message);
    }
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
    <div className="main-content">
      <SpNavbar user={user} />
      <SPSideNavbar user={user} />
      {showSuccessMessage && (
        <div className="successMessage">
          Details updated successfully!
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Update Profile</h1>
      </div>
      <h5>Welcome, {user.username}!. 
      
      You can update your profile details accordingly and the changes get effected in the backend users table.</h5>
      {/* Editable user details form */}
      <form>
      <label>
          Email:
          <input type="text" name="emailaddress" value={user.emailaddress} onChange={handleInputChange} />
        </label>
        <label>
          First Name:
          <input type="text" name="firstname" value={user.firstname} onChange={handleInputChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastname" value={user.lastname} onChange={handleInputChange} />
        </label>
        <label>
          Mobile:
          <input type="text" name="mobile" value={user.mobile} onChange={handleInputChange} />
        </label>
        <label>
            Sex:
            <select name="sex" value={user.sex} onChange={handleInputChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
        </label>
        <label>
          Address 1:
          <input type="text" name="address1" value={user.address1} onChange={handleInputChange} />
        </label>
        <label>
          Address 2:
          <input type="text" name="address2" value={user.address2} onChange={handleInputChange} />
        </label>
        <label>
          City:
          <input type="text" name="city" value={user.city} onChange={handleInputChange} />
        </label>
        <label>
          State:
          <input type="text" name="state" value={user.state} onChange={handleInputChange} />
        </label>
        <label>
          Zipcode:
          <input type="text" name="zipcode" value={user.zipcode} onChange={handleInputChange} />
        </label>
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
};

export default SpProfileUpdatePage;
