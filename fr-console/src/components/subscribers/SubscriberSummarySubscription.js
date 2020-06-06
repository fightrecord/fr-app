import React from 'react';
import { DateTime } from 'luxon';

export default ({ subscriber: { starts, ends, next } = {} }) => (
  <div className="info subscription">
    <div className="detail from">
      <label>Period</label>
      <p>
        {starts.toLocaleString(DateTime.DATE_FULL)}
        ->
        {ends.toLocaleString(DateTime.DATE_FULL)}
      </p>
    </div>
    <div className="detail until">
      <label>Next</label>
      <p>{next.toLocaleString(DateTime.DATE_FULL)}</p>
    </div>
  </div>
);