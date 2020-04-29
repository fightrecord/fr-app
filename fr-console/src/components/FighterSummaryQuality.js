import React, { useState } from 'react';
import cx from 'classnames';

export default ({ fighter: { _quality } = {} }) => {
  const [showQualityReport, setShowQualityReport] = useState(false);

  const toggleQualityReport = () => setShowQualityReport(!showQualityReport);

  const { score, actions } = _quality || {};
  return (
    <>
      <div className="info quality" onClick={toggleQualityReport}>
        <p>{score}</p>
      </div>
      <div className={cx('info', 'quality-report', { shown: showQualityReport })} onClick={toggleQualityReport}>
        {actions.map((action, key) => <p key={key}>{action}</p>)}
      </div>
    </>
  );
};