import React from 'react';
import ReportBigNumber from './ReportBigNumber';

export default ({ quality = {} }) => {
  const { quartiles = {} } = quality;

  return (
    <div className="report-quality">
      <ReportBigNumber label="Pristine" number={quartiles[3]} />
      <ReportBigNumber label="Good" number={quartiles[2]} />
      <ReportBigNumber label="Average" number={quartiles[1]} />
      <ReportBigNumber label="Poor" number={quartiles[0]} />
    </div>
  );
};