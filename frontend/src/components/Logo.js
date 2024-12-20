import React from 'react';

const Logo = ({ w, h }) => {
  return (
    <div style={styles.container}>
      <img
        src="/assest/spotvibelogo.png"
        alt="Logo"
        style={{
          ...styles.logo,
          width: w || 'auto', // Let the width be auto by default
          height: h || 'auto', // Let the height scale with the width
        }}
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box', // Ensures padding doesn't affect layout
  },
  logo: {
    maxWidth: '100%', // Ensures the logo scales down properly on bigger screens
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
    cursor: 'pointer', // Adds a pointer cursor for interactivity
  },
};

// Adjusting logo size for smaller screens
const mediaQueries = {
  '@media (max-width: 1024px)': {
    logo: {
      maxWidth: '90%', // Slightly smaller than full width, but still visible
    },
  },
  '@media (max-width: 768px)': {
    logo: {
      maxWidth: '80%', // Reduce size for mobile view
    },
  },
  '@media (max-width: 480px)': {
    logo: {
      maxWidth: '70%', // Keep logo noticeable but smaller on very small screens
    },
  },
};

export default Logo;
