import React from 'react';
import DashboardPanel from './DashboardPanel';

export default ({ label, value }) => (
  <DashboardPanel className="big-number">
    <label>{label}</label>
    <p>{value}</p>
  </DashboardPanel>
);