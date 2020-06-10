import React from 'react';
import cx from 'classnames';

export default ({ options = [], defaultValue, onChange = () => null }) => (
  <>
    {options.map(({ label, value }) => (
      <span
        key={value}
        className={cx('tiny-picker', 'pill', {
          selected: defaultValue && defaultValue.toLowerCase() === value
        })}
        onClick={() => onChange(value)}
      >
        {label}
      </span>
    ))}
  </>
);