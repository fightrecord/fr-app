import React from 'react';
import cx from 'classnames';
import DataTrend from './DataTrend';

export default ({ className }) => (
    <div className={cx('page', 'dashboard', className)}>
        <DataTrend />
    </div>
);