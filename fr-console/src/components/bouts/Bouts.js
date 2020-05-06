import React from 'react';
import BoutSummary from './BoutSummary';

export default ({ bouts, fighterId }) => (
  <div className="bouts">
    {bouts.map((bout, key) => (
      <BoutSummary key={key} bout={bout} fighterId={fighterId} />
    ))}
    {bouts.length < 1 && <p>No bouts recorded for this fighter</p>}
  </div>
);