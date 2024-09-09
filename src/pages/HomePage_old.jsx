//   pages/HomePage.jsx

import React from 'react';
import NavigateButton from '../components/NavigateButton.jsx'; // Adjust the import path if necessary

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <NavigateButton to="/about" label="Go to About Page" />
  </div>
);

export default HomePage;

