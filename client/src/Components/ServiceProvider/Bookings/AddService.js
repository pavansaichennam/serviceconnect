import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import SpNavbar from '../SpNavbar/SpNavbar';
import SpSideNavbar from '../SpSideNav/SPSideNavbar';
import { useLocation } from 'react-router-dom';
import './AddService.css';

const AddService = () => {
  const [services, setServices] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error.response ? error.response.data : error.message);
      }
    };
  
    fetchServices();
  }, []); // Empty dependency array means this effect runs once on mount
  

  useEffect(() => {
    // Fetch service types based on selected service
    if (selectedService) {
      axios.get(`http://localhost:5000/api/servicetypes/${selectedService}`).then(response => {
        setServiceTypes(response.data);
      });
    }
  }, [selectedService]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/servicecatalog', {
        Service_Id: selectedService,
        Service_Type_ID: selectedServiceType,
        Service_Provider_ID: user.id,
        Price: price,
        Description: description
      });
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
      setSelectedService(''); // Assuming '' is the initial state
      setSelectedServiceType(''); // Assuming '' is the initial state
      setPrice(''); // Assuming '' is the initial state for price
      setDescription(''); // Assuming '' is the initial state for description
    } catch (error) {
      console.error('Error adding service:', error);
      alert('Failed to add service');
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
    <form onSubmit={handleSubmit} className="add-service-form">
    <p>Add a Service</p>
      <select value={selectedService} onChange={e => setSelectedService(e.target.value)}>
        <option value="">Select Service</option>
        {services.map(service => (
          <option key={service.Service_Id} value={service.Service_Id}>{service.Service_Name}</option>
        ))}
      </select>

      <select value={selectedServiceType} onChange={e => setSelectedServiceType(e.target.value)} disabled={!selectedService}>
        <option value="">Select Service Type</option>
        {serviceTypes.map(type => (
          <option key={type.Service_Type_ID} value={type.Service_Type_ID}>{type.Service_Type}</option>
        ))}
      </select>

      <input type="text" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description"></textarea>
      <button type="submit">Add Service</button>
    </form>
    </div>
  );
};

export default AddService;
