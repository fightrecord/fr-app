import React from 'react';

export default ({ message }) => (
  <div className="spinner">
    <div className="spinner-inner"><div></div><div></div></div>
    {message && <p>{message}</p>}
  </div>
);
