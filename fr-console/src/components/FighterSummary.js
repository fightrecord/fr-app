import React from 'react';
import { asFeetAndInches } from '../conversion';

export default ({ fighter }) => {
  const {
    age, city, className, country, gender, height, name,
    record, region, teamName, weight
  } = fighter;

  const filteredRecord = record
    .filter(({ discipline, won, lost, draw }) => discipline || won || lost || draw);

  return (
    <div className="fighter-summary">
      <div className="info basic">
        <h1>{name}</h1>
        <h2>{teamName || ''}</h2>
      </div>
      <div className="info bio">
        <div className="detail age">
          <label>Age</label>
          <p>{age || ''}</p>
        </div>
        <div className="detail gender">
          <label>Gender</label>
          <p>{gender || ''}</p>
        </div>
      </div>
      <div className="info metrics">
        <div className="detail height">
          <label>Height</label>
          <p>{height ? `${height}m (${asFeetAndInches(height)})` : ''}</p>
        </div>
        <div className="detail weight">
          <label>Weight</label>
          <p>{weight ? `${weight}kg` : ''}</p>
        </div>
        <div className="detail class">
          <label>Class</label>
          <p>{className ? className : ''}</p>
        </div>
      </div>
      <div className="info location">
        <div className="detail country">
          <label>Country</label>
          <p>{country || ''}</p>
        </div>
        <div className="detail region">
          <label>Region</label>
          <p>{region || ''}</p>
        </div>
        <div className="detail city">
          <label>City</label>
          <p>{city || ''}</p>
        </div>
      </div>
      <div className="info record">
        {filteredRecord.length > 0
          ? filteredRecord
            .map(({ discipline, won, lost, draw }, key) => (
              <div className="detail discipline" key={key}>
                <label>{discipline}</label>
                <p>
                  <span>W:{won}</span>
                  <span>L:{lost}</span>
                  <span>D:{draw}</span>
                </p>
              </div>
            )) : (
            <p className="no-record">
              No record for this fighter
            </p>
          )}
      </div>
    </div>
  )
};