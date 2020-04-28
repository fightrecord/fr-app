import React from 'react';
import { asFeetAndInches } from '../conversion';

export default ({ fighter: { height, weight, className } = {} }) => (
  <div className="info metrics">
    <div className="detail height">
      <label>Height</label>
      {height && <p>{height}m <span>({asFeetAndInches(height)})</span></p>}
    </div>
    <div className="detail weight">
      <label>Weight</label>
      {weight && <p>{weight}kg</p>}
    </div>
    <div className="detail class">
      <label>Class</label>
      {className && <p>{className}</p>}
    </div>
  </div>
);