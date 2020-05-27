import React from 'react';
import cx from 'classnames';

export default ({
  className,
  defaultValue,
  placeholder,
  onChange = () => null,
  validation = () => [true]
}) => {
  const [, validationMessage] = validation(defaultValue);

  return (
    <div className={cx('single-line', className)}>
      <input
        type="text"
        defaultValue={defaultValue}
        onChange={ev => onChange(ev.target.value)}
        placeholder={placeholder}
      />
      {validationMessage && <p className="validation-message">{validationMessage}</p>}
    </div>
  );
};