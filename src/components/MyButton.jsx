//components/MyButton.jsx

import React from 'react';

const MyButton = ({ to }) => (
  <button className="my-button">
    Take me to {to === '' ? "home" : to}
  </button>
);

export default MyButton;

