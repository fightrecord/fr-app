import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import Bouts from './Bouts';
import FighterSummaryBasic from './FighterSummaryBasic';
import FighterSummaryBio from './FighterSummaryBio';
import FighterSummaryLocation from './FighterSummaryLocation';
import FighterSummaryMetrics from './FighterSummaryMetrics';
import FighterSummaryQuality from './FighterSummaryQuality';
import FighterSummaryRecord from './FighterSummaryRecord';
import Spinner from './Spinner';
import { loadFighterHistory } from '../services/fighter';

export default ({ fighter }) => {
  const [showAdditional, setShowAdditional] = useState(false);
  const [history, setHistory] = useState();

  const { _id, _quality = {} } = fighter;
  const score = _quality.score || 0;
  const qualityBucket = Math.floor(score / 250);

  useEffect(() => {
    if (showAdditional && !history) {
      loadFighterHistory(_id).then(setHistory);
    }
  }, [_id, showAdditional, history]);

  const toggleAdditional = () => setShowAdditional(!showAdditional);

  return (
    <div className={cx('fighter-summary', 'quality_' + qualityBucket)}>
      <div className="row">
        <FighterSummaryQuality fighter={fighter} />
        <FighterSummaryBasic fighter={fighter} />
        <FighterSummaryBio fighter={fighter} />
        <FighterSummaryMetrics fighter={fighter} />
        <FighterSummaryLocation fighter={fighter} />
        <FighterSummaryRecord fighter={fighter} onClick={toggleAdditional} />
      </div>
      <div className={cx('additional', { shown: showAdditional })}>
        {history
          ? <Bouts bouts={history || []} fighterId={_id} />
          : <Spinner />}
      </div>
    </div>
  )
};