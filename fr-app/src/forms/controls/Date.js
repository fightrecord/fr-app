import React from 'react';
import { DateTime } from 'luxon';
import cx from 'classnames';

export default ({
  className,
  defaultValue = DateTime.utc().toISO(),
  onChange = () => null,
  validation = () => [true]
}) => {
  const [, validationMessage] = validation(defaultValue);

  const now = DateTime.utc();
  const dt = DateTime.fromISO(defaultValue);

  const onDayChange = day => onChange(dt.set({ day }).toISO());
  const onMonthChange = month => onChange(dt.set({ month }).toISO());
  const onYearChange = year => onChange(dt.set({ year }).toISO());

  return (
    <div className={cx('date', className)}>
      <div className="parts">
        <input
          type="number"
          min="1"
          max="31"
          defaultValue={dt.day}
          onChange={ev => onDayChange(ev.target.value)}
        />
        <div className="separator">/</div>
        <input
          type="number"
          min="1"
          max="12"
          defaultValue={dt.month}
          onChange={ev => onMonthChange(ev.target.value)}
        />
        <div className="separator">/</div>
        <input
          type="number"
          min={now.plus({ years: -100 }).year}
          max={now.plus({ years: 4 }).year}
          defaultValue={dt.year}
          onChange={ev => onYearChange(ev.target.value)}
        />
      </div>
      {validationMessage && <p className="validation-message">{validationMessage}</p>}
    </div>
  );
};