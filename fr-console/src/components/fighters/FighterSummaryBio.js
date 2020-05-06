import React from 'react';
import { DateTime } from 'luxon';

export default ({ fighter: { age, dob, gender } = {} }) => (
  <div className="info bio">
    <div className="detail age">
      <label>Age</label>
      <p>{age}</p>
    </div>
    <div className="detail age">
      <label>DoB</label>
      <p>{dob && dob.toLocaleString(DateTime.DATE_MED)}</p>
    </div>
    <div className="detail gender">
      <label>Gender</label>
      <p>{gender}</p>
    </div>
  </div>
);