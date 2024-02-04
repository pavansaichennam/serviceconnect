// SignUp.js
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';
import './signup.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    emailaddress: '',
    mobile: '',
    firstname: '',
    lastname: '',
    sex: '',
    role: '',
    password: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Implement the logic to send the form data to the server (backend API)
    try {
    const response = await axios.post('http://localhost:5000/api/signup', formData);
    // You can use axios or fetch for making API requests
    // console.log(ErrorResponse);
    // console.log('Form Submitted:', formData);
    // // Reset the form after submission
    // setFormData({
    //   firstname: '',
    //   lastname: '',   
    //   username: '',
    //   emailaddress: '',
    //   mobile: '',
    //   sex: '',
    //   role: '',
    //   password: '',
    //   address1: '',
    //   address2: '',
    //   city: '',
    //   state: '',
    //   zipcode: '',
    // });
    navigate("/login");
} catch (error) {
        console.error('Error Signing up user:', error);
      };
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <label>
          First Name:
          <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} required />
        </label>
        <br></br>

        <label>
          Last Name:
          <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} required />
        </label>        <br></br>


        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </label>        <br></br>


        <label>
          Email Address:
          <input type="email" name="emailaddress" value={formData.emailaddress} onChange={handleChange} required />
        </label>        <br></br>


        <label>
          Mobile:
          <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
        </label>        <br></br>


        <label>
          Sex:
          <select name="sex" value={formData.sex} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>        <br></br>

        <label>
          Role:
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="SP">Service Provider</option>
            <option value="CSTR">Customer</option>
            <option value="ADM">Admin</option>
          </select>
        </label>        <br></br>

        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>        <br></br>


        <label>
          Address 1:
          <input type="text" name="address1" value={formData.address1} onChange={handleChange} required />
        </label>        <br></br>


        <label>
          Address 2:
          <input type="text" name="address2" value={formData.address2} onChange={handleChange} />
        </label>        <br></br>


        <label>
          City:
          <input type="text" name="city" value={formData.city} onChange={handleChange} required />
        </label>        <br></br>


        <label>
          State:
          <input type="text" name="state" value={formData.state} onChange={handleChange} required />
        </label>        <br></br>


        <label>
          Zip Code:
          <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} required />
        </label>        <br></br>


        <button type="submit">Sign Up</button>
        <br></br>
        <div>
            <button onClick={() => window.location.assign('/login')}>Login Page</button>
            <button onClick={() => window.location.assign('/')}>Landing Page</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
