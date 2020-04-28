import React from 'react';
import cx from 'classnames';
import FighterSummaryBasic from './FighterSummaryBasic';
import FighterSummaryBio from './FighterSummaryBio';
import FighterSummaryLocation from './FighterSummaryLocation';
import FighterSummaryMetrics from './FighterSummaryMetrics';
import FighterSummaryQuality from './FighterSummaryQuality';
import FighterSummaryRecord from './FighterSummaryRecord';

export default ({ fighter }) => {
  const { _quality = {} } = fighter;
  const score = _quality.score || 0;
  const qualityBucket = Math.floor(score / 250);

  return (
    <div className={cx('fighter-summary', 'quality_' + qualityBucket)}>
      <FighterSummaryQuality fighter={fighter} />
      <FighterSummaryBasic fighter={fighter} />
      <FighterSummaryBio fighter={fighter} />
      <FighterSummaryMetrics fighter={fighter} />
      <FighterSummaryLocation fighter={fighter} />
      <FighterSummaryRecord fighter={fighter} />
    </div>
  )
};