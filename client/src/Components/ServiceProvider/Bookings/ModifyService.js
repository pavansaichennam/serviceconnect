import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SpNavbar from '../SpNavbar/SpNavbar';
import SpSideNavbar from '../SpSideNav/SPSideNavbar';
import './ModifyService.css';

const ModifyService = () => {
  const { ServiceCatalog_Id } = useParams();
  const location = useLocation();
  const { user } = location.state || {};
  const [serviceDetails, setServiceDetails] = useState(null);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch service details
  useEffect(() => {
    const fetchServiceDetails = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`http://localhost:5000/api/servicecatalog/${ServiceCatalog_Id}`);
          console.log('API Response:', response.data);
          if (response.data.success) {
            setServiceDetails(response.data.data);
            console.log('Service Details:', response.data.data); // Log the service details
            // Fetch service types using the Service_Id from the service details
            const serviceId = response.data.data.Service_id;
            console.log('Service_Id:', serviceId); // This will print the Service_Id
            const typesResponse = await axios.get(`http://localhost:5000/api/servicetypes/${serviceId}`);
            setServiceTypes(typesResponse.data);
          } else {
            throw new Error('Service details not found');
          }
        } catch (error) {
          console.error('Error fetching service details:', error);
        }
        setIsLoading(false);
      };      

    fetchServiceDetails();
  }, [ServiceCatalog_Id]);

  // Fetch service types based on the service_id from serviceDetails
  useEffect(() => {
    if (serviceDetails && serviceDetails.Service_Id) {
      const fetchServiceTypes = async () => {
        try {
          const typesResponse = await axios.get(`http://localhost:5000/api/servicetypes/${serviceDetails.Service_Id}`);
          setServiceTypes(typesResponse.data);
        } catch (error) {
          console.error('Error fetching service types:', error);
        }
      };

      fetchServiceTypes();
    }
  }, [serviceDetails]);

  const handleServiceTypeChange = (e) => {
    setServiceDetails({ ...serviceDetails, Service_Type_ID: e.target.value });
  };

  const handlePriceChange = (e) => {
    setServiceDetails({ ...serviceDetails, Price: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare the data to send to the backend
    const updatedServiceDetails = {
      Service_Type_ID: serviceDetails.Service_Type_ID, // Assuming this is the ID, not the name
      Price: serviceDetails.Price,
    };

    try {
      const updateResponse = await axios.put(`http://localhost:5000/api/updateservicecatalog/${ServiceCatalog_Id}`, updatedServiceDetails);

      if (updateResponse.data.success) {
        navigate('/list-service', { state: { user } });
        // Optionally redirect or fetch the service details again here
      } else {
        throw new Error(updateResponse.data.message || 'Failed to update service');
      }
    } catch (error) {
      console.error('Error updating service:', error);
      alert('Error updating service: ' + error.message);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SpNavbar user={user} />
      <SpSideNavbar user={user} />
      <div className="modify-service-content">
        <h1>Modify Service</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Service Name:
            <input type="text" value={serviceDetails?.Service_Name || ''} disabled />
          </label>
          <br/>
          <label>
            Service Type:
            <select 
              value={serviceDetails?.Service_Type_ID || ''} 
              onChange={handleServiceTypeChange}
              disabled={!serviceTypes.length}
            >
              {/* Populate the dropdown with service types related to the selected service */}
              {serviceTypes.map((type) => (
                <option key={type.Service_Type_ID} value={type.Service_Type_ID}>
                  {type.Service_Type}
                </option>
              ))}
            </select>
          </label>
          <br/>
          <label>
            Price:
            <input 
              type="number" 
              value={serviceDetails?.Price || ''} 
              onChange={handlePriceChange} 
            />
          </label>
          <br/>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default ModifyService;
