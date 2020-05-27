import React from 'react';
import cx from 'classnames';

const CM_IN_INCH = 2.54;
const INCHES_IN_FOOT = 12;

export default ({
  className,
  defaultValue = 1.8,
  onChange = () => null,
  validation = () => [true]
}) => {
  const [, validationMessage] = validation(defaultValue);

  const totalInches = Math.floor((defaultValue * 100) / CM_IN_INCH);
  const feet = Math.floor(totalInches / INCHES_IN_FOOT);
  const inches = Math.floor(totalInches % INCHES_IN_FOOT);

  const imperialToMetric = (f, i) => ((f * INCHES_IN_FOOT) + i) * CM_IN_INCH;

  const onMetreChanged = metre => onChange(metre);
  const onFeetChange = newFeet => onChange(imperialToMetric(newFeet, inches));
  const onInchChange = newInches => onChange(imperialToMetric(feet, newInches));

  return (
    <div className="height">
      <div className="parts">
        <input
          type="number"
          min="0"
          max="10"
          defaultValue={feet}
          onChange={ev => onFeetChange(ev.target.value)}
        />
        <div className="separator">ft</div>
        <input
          type="number"
          min="0"
          max="11"
          defaultValue={inches}
          onChange={ev => onInchChange(ev.target.value)}
        />
        <div className="separator">in</div>
        <div className="spacer">or</div>
        <input
          type="number"
          min="1"
          max="12"
          defaultValue={defaultValue.toFixed(2)}
          onChange={ev => onMetreChanged(ev.target.value)}
        />
        <div className="separator">m</div>
      </div>
      {validationMessage && <p className="validation-message">{validationMessage}</p>}
    </div>
  );
};