import React from 'react';
import cx from 'classnames';

export default ({
  label,
  options,
  selected,
  disabled,
  onChange = () => null
}) => {
  const optionArray = Array.isArray(options)
    ? options.map(value => ({ name: value, value }))
    : Object.entries(options).map(([name, value]) => ({ name, value }));

  return (
    <div className="selector">
      {label && <label>{label}</label>}
      {optionArray.map(({ name, value }) => (
        <div
          key={value}
          className={cx('option', {
            selected: selected === value,
            disabled
          })}
          onClick={() => disabled || onChange(value)}
        >
          {name}
        </div>
      ))}
    </div>
  );
};