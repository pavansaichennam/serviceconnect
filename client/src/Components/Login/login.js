// login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login data to the server for authentication
      const response = await axios.post('http://localhost:5000/api/login', loginData);

      console.log(response)
      // If authentication is successful, navigate to the Dashboard
      if (response.data.success) {
        const user = response.data.user;
        console.log('User Details:', user);
        switch (user.role) {
            case 'SP':
              navigate("/spdashboard", { state: { user } });
              break;
            case 'CSTR':
              navigate("/cstrdashboard", { state: { user } });
              break;
            case 'ADM':
              navigate("/dashboard", { state: { user } });
              break;
            default:
              console.error('Unknown role:', user.role);
              // Handle unknown role (optional)
              break;
          }
      } else {
        console.error('Authentication failed');
        // Handle authentication failure (e.g., show error message)
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle other errors (e.g., show error message)
    }
  };

  return (
    <div>
        <img
        src="https://play-lh.googleusercontent.com/tQmR5EZNyFDGsAe_JgwB_urSHLguhO7bU1EeaC0xH3mpADpcgS0o0BFOdCh3QyAYllWb=w240-h480-rw"
        alt="React Logo"
        style={{ maxWidth: '100%', height: 'auto', color: 'black' }}
      />
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={loginData.username}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button type="submit">Login</button>
        <br />
        <div>
          <button onClick={() => window.location.assign('/signup')}>Sign Up</button>
          <button onClick={() => window.location.assign('/')}>Landing Page</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
