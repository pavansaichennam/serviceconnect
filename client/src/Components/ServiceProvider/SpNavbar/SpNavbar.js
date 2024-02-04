import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SpNavbar.css'

function SpNavbar ({ user }) {

    const navigate = useNavigate()
    const handleLogout = () => {
        // Clear user information and redirect to login page
        navigate('/login', { state: { user: null } });
      };
      
    return <>
    <div className='adminNav'>
        <div className='navContents'>
            <span className='navLinks' onClick={()=>navigate('/spdashboard', { state: { user } })}>Home</span>
            <span className='navLinks'onClick={()=>navigate('/spprofilepage', { state: { user } })}> Profile</span>
            <span className='navLinks' onClick={handleLogout}> Logout</span>
        </div>
    </div>
    </>
}

export default SpNavbar;