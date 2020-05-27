import React, { useState } from 'react';
import Date from './controls/Date';
import Height from './controls/Height';
import Selection from './controls/Selection';
import SingleLine from './controls/SingleLine';
import Weight from './controls/Weight';

export default ({ field = {} }) => {
  const {
    label,
    type = 'text',
    privacy = 'protected',
    placeholder,
    validation = () => [false, 'No validation rule'],
    explanation,
    options
  } = field;

  const [value, setValue] = useState();

  const typeMap = {
    singleLine: () => <SingleLine
      className={privacy}
      defaultValue={value}
      placeholder={placeholder}
      validation={validation}
      onChange={setValue} />,
    selection: () => <Selection
      className={privacy}
      defaultValue={value}
      validation={validation}
      options={options}
      onChange={setValue} />,
    date: () => <Date
      className={privacy}
      defaultValue={value}
      validation={validation}
      onChange={setValue} />,
    time: () => <input />,
    height: () => <Height
      className={privacy}
      defaultValue={value}
      validation={validation}
      onChange={setValue} />,
    weight: () => <Weight
      className={privacy}
      defaultValue={value}
      validation={validation}
      onChange={setValue} />
  };

  return (
    <div className="field">
      <div className="user-input">
        <label>{label}</label>
        {typeMap[type]()}
      </div>
      {explanation && <p className="explanation">{explanation}</p>}
    </div>
  );
};