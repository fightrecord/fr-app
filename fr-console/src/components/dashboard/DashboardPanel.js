import React from 'react';
import cx from 'classnames';

export default ({ className, children }) => (
  <div className={cx('dashboard-panel', className)}>
    {children}
  </div>
);