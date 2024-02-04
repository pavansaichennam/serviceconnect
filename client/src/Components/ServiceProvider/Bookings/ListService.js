import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import SpNavbar from '../SpNavbar/SpNavbar';
import SpSideNavbar from '../SpSideNav/SPSideNavbar';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './ListService.css'; // Import the CSS for styling

const ListService = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state || {};
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showDelMessage, setShowDelMessage] = useState(false);

  if (!user) {
    // Handle case where user details are not available
    return (
      <div>
        <p>User details not available.</p>
      </div>
    );
  }

  useEffect(() => {
    const fetchServices = async () => {
      try {
        console.log('API call started', user.id);
        const response = await axios.get(`http://localhost:5000/api/servicecatalog/user/${user.id}`, user);
        setServices(response.data);
        console.log('API call ended', response.data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };

    fetchServices();
  }, [user.id]);

  const handleModify = (ServiceCatalog_Id) => {
    navigate(`/modify-service/${ServiceCatalog_Id}`, { state: { user: user } });
  };

  const handleDelete = async (ServiceCatalog_Id) => {
    try {
      await axios.delete(`http://localhost:5000/api/deleteservicecatalog/${ServiceCatalog_Id}`);
      setServices(services.filter(service => service.ServiceCatalog_Id !== ServiceCatalog_Id));
      setShowDelMessage(true);
      setTimeout(() => {
        setShowDelMessage(false);
      }, 3000);    } catch (error) {
      console.error('Failed to delete service:', error);
    }
  };

  return (
    <div>
    <SpNavbar user={user} />
    <SpSideNavbar user={user} />
    {showSuccessMessage && (
        <div className="successMessage">
          New service for your profile is added successfully!
        </div>
      )}
      {showDelMessage && (
        <div className="successMessage">
          Your service record has been deleted successfully!
        </div>
      )}
    <div className="service-list-container">
      <table>
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Service Type</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service.ServiceCatalog_Id}>
              <td>{service.Service_Name}</td>
              <td>{service.Service_Type}</td>
              <td>{service.Price}</td>
              <td>{service.Description}</td>
              <td>
                <button onClick={() => handleModify(service.ServiceCatalog_Id)}>Modify</button>
                <button onClick={() => handleDelete(service.ServiceCatalog_Id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ListService;