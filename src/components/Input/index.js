import React from 'react';

export default function Input({ type, className, placeholder, value, handleChange }) {
  // Declare a new state variable, which we'll call "count"
  return (
    <input type={type}
      value={value}
      className={className}
      placeholder={placeholder}
      onChange={handleChange} />
  );
}