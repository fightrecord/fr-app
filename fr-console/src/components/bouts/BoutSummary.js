import React from 'react';
import cx from 'classnames';
import BoutSummaryEvent from './BoutSummaryEvent';
import BoutSummaryFighter from './BoutSummaryFighter';
import BoutSummaryResult from './BoutSummaryResult';

export default ({ bout, fighterId }) => {
  const { wasDraw, winnerId } = bout;

  const win = winnerId === fighterId;

  return (
    <div className={cx('bout-summary', {
      win,
      loss: !win && !wasDraw,
      draw: wasDraw
    })}>
      <div className="row">
        <div className="info vs">
          <p>vs</p>
        </div>
        <BoutSummaryFighter bout={bout} fighterId={fighterId} />
        <BoutSummaryEvent bout={bout} fighterId={fighterId} />
        <BoutSummaryResult bout={bout} fighterId={fighterId} />
      </div>
    </div>
  )
};