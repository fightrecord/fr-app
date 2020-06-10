import React from 'react';
import { DateTime } from 'luxon';
import TinyPicker from '../TinyPicker';

export default ({
  fighter: { age, dob, gender } = {},
  onChange = () => () => null
}) => (
    <div className="info bio">
      <div className="detail age">
        <label>Age</label>
        <p>{age}</p>
      </div>
      <div className="detail age">
        <label>DoB</label>
        <p>{dob && dob.toLocaleString(DateTime.DATE_MED)}</p>
      </div>
      <div className="detail gender">
        <label>Gender</label>
        <p>{gender || (
          <TinyPicker
            options={[
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' }
            ]}
            defaultValue={gender}
            onChange={onChange('gender')}
          />
        )}</p>
      </div>
    </div>
  );