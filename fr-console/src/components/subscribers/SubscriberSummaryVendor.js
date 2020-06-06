import React from 'react';
import cx from 'classnames';

export default ({ subscriber: { vendor: { type } = {} } = {} }) => (
  <div className={cx('info', 'vendor', type)}>
    <div className="logo" />
  </div>
);