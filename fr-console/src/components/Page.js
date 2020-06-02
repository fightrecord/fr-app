import React from 'react';
import cx from 'classnames';

export default ({ className, children, isSelected }) => (
  <div className={cx('page', className, { selected: isSelected })}>
    {children}
  </div>
);