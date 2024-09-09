//   components/NavigateButton.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigateButton = ({ to, label }) => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(to)}>
      {label}
    </button>
  );
};

export default NavigateButton;

