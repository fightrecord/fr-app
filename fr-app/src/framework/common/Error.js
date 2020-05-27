import React from 'react';

export default ({ error }) => (
  <div className="error">
    {JSON.stringify(error)}
  </div>
);
