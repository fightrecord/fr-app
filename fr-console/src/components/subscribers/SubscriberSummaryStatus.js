import React, { useState } from 'react';
import cx from 'classnames';

export default ({ subscriber: { status } = {} }) => {
  const [showStatusReport, setShowStatusReport] = useState(false);

  const toggleStatusReport = () => setShowStatusReport(!showStatusReport);

  return (
    <>
      <div className="info status" onClick={toggleStatusReport}>
        <p>{status}</p>
      </div>
      <div
        className={cx('info', 'status-report', { shown: showStatusReport })}
        onClick={toggleStatusReport}
      >
      </div>
    </>
  );
};