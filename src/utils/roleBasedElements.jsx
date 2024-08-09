// utils/roleBasedElements.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleBasedElement = ({ adminComponent, retailerComponent }) => {
  const user = localStorage.getItem('token');
  const admin = localStorage.getItem('isAdmin');
console.log(user);
console.log(admin);

  if (!user) {
    return <Navigate to="/unauthorized" />;
  }
  
  if (admin === 'true') {
    return adminComponent;
  } else {
    return retailerComponent;
  }
};

export default RoleBasedElement;