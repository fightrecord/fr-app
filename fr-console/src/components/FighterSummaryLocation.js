import React from 'react';

export default ({ fighter: { country, region, city } = {} }) => (
  <div className="info location">
    <div className="detail country">
      <label>Country</label>
      <p>{country || ''}</p>
    </div>
    <div className="detail region">
      <label>Region</label>
      <p>{region || ''}</p>
    </div>
    <div className="detail city">
      <label>City</label>
      <p>{city || ''}</p>
    </div>
  </div>
);