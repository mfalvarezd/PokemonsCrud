
import React from 'react';

const ProgressBar = ({ label, value }) => (
  <div style={{ marginBottom: '0.5rem' }}>
    <span>{label}: {value}</span>
    <progress value={value} max="100" style={{ width: '100%' }} />
  </div>
);

export default ProgressBar;
