import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CstrNavbar.css'

function CstrNavbar ({ user }) {

    const navigate = useNavigate()
    const handleLogout = () => {
        // Clear user information and redirect to login page
        navigate('/login', { state: { user: null } });
      };

    const renderProfileImage = () => {
        if (user.profile_photo) {
            // Assuming profile_photo is a base64-encoded string
            return <img src={`data:image/jpeg;base64,${user.profile_photo}`} alt="Profile" className="profilePhoto" />;
        } else {
            return <span className="profileInitials">{`${user.lastname[0]}${user.firstname[0]}`}</span>;
        }
    };    
      
    return <>
    <div className='adminNav'>
        <div className='navContents'>
            {renderProfileImage()}
            <span className='navLinks' onClick={()=>navigate('/cstrdashboard', { state: { user } })}>Home</span>
            <span className='navLinks'onClick={()=>navigate('/cstrprofilepage', { state: { user } })}>Profile</span>
            <span className='navLinks' onClick={handleLogout}> Logout</span>
        </div>
    </div>
    </>
}

export default CstrNavbar;