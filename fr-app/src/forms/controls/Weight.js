import React from 'react';
import cx from 'classnames';

const KG_IN_POUND = 0.453592;
const POUNDS_IN_STONE = 14;

export default ({
  className,
  defaultValue = 70,
  onChange = () => null,
  validation = () => [true]
}) => {
  const [, validationMessage] = validation(defaultValue);

  const totalPounds = Math.floor(defaultValue / KG_IN_POUND);
  const stone = Math.floor(totalPounds / POUNDS_IN_STONE);
  const pounds = Math.floor(totalPounds % POUNDS_IN_STONE);

  const imperialToMetric = (f, i) => ((f * POUNDS_IN_STONE) + i) * KG_IN_POUND;

  const onKgChanged = kg => onChange(kg);
  const onStonesChange = newStones => onChange(imperialToMetric(newStones, pounds));
  const onPoundsChange = newPounds => onChange(imperialToMetric(stone, newPounds));

  return (
    <div className={cx('weight', className)}>
      <div className="parts">
        <input
          type="number"
          min="0"
          max="40"
          defaultValue={stone}
          onChange={ev => onStonesChange(ev.target.value)}
        />
        <div className="separator">st</div>
        <input
          type="number"
          min="0"
          max="13"
          defaultValue={pounds}
          onChange={ev => onPoundsChange(ev.target.value)}
        />
        <div className="separator">lb</div>
        <div className="spacer">or</div>
        <input
          type="number"
          min="1"
          max="12"
          defaultValue={defaultValue.toFixed(1)}
          onChange={ev => onKgChanged(ev.target.value)}
        />
        <div className="separator">Kg</div>
      </div>
      {validationMessage && <p className="validation-message">{validationMessage}</p>}
    </div>
  );
};