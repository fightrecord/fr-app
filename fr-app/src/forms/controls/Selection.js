import React from 'react';
import cx from 'classnames';

export default ({
  className,
  defaultValue,
  options = {},
  onChange = () => null,
  validation = () => [true]
}) => {
  const [, validationMessage] = validation(defaultValue);

  return (
    <div className={cx('selection', className)}>
      <select
        defaultValue={defaultValue}
        onChange={ev => onChange(ev.target.value)}
      >
        <option className="placeholder" value={null}>Select...</option>
        {Object.entries(options).map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      {validationMessage && <p className="validation-message">{validationMessage}</p>}
    </div>
  );
};