import React from 'react';

export default ({ title, message }) => (
  <>
    <div className="mask"></div>
    <div className="content">
      <div className="content-inner">
        <h1>{title}</h1>
        <p>{message}</p>
      </div>
    </div>
  </>
);