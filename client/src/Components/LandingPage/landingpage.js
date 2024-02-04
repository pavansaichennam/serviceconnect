// LandingPage.js

import React from 'react';

const LandingPage = () => {
  return (
    <div>
      <h1 style={{ color: 'black' }}>Welcome to Service Connect App</h1>
      {/* Add other content on the landing page */}
      <p style={{ color: 'black' }}>This is the Landing page for your service connect application</p>
      <img
        src="https://play-lh.googleusercontent.com/tQmR5EZNyFDGsAe_JgwB_urSHLguhO7bU1EeaC0xH3mpADpcgS0o0BFOdCh3QyAYllWb=w240-h480-rw"
        alt="React Logo"
        style={{ maxWidth: '100%', height: 'auto', color: 'black' }}
      />
          <br />
          <button onClick={() => window.location.assign('/login')}>Login Page</button>
          <br />
          <button onClick={() => window.location.assign('/signup')}>Sign Up Page</button>
    </div>
  );
};

export default LandingPage;
