import React from 'react';

export default ({ fighter: { age, gender } = {} }) => (
  <div className="info bio">
    <div className="detail age">
      <label>Age</label>
      <p>{age}</p>
    </div>
    <div className="detail gender">
      <label>Gender</label>
      <p>{gender}</p>
    </div>
  </div>
);