import React from 'react';

export default ({ fighter }) => {
  const {
    age, city, country, gender, height, name,
    region, teamName, weight
  } = fighter;

  return (
    <div className="fighter-summary">
      <div className="info basic">
        <h1>{name}</h1>
        <h2>{teamName || 'N/A'}</h2>
      </div>
      <div className="info bio">
        <div className="detail age">
          <label>Age</label>
          <p>{age || 'N/A'}</p>
        </div>
        <div className="detail gender">
          <label>Gender</label>
          <p>{gender || 'N/A'}</p>
        </div>
        <div className="detail height">
          <label>Height</label>
          <p>{height ? `${height}m` : 'N/A'}</p>
        </div>
        <div className="detail weight">
          <label>Weight</label>
          <p>{weight ? `${weight}kg` : 'N/A'}</p>
        </div>
      </div>
      <div className="info location">
        <div className="detail country">
          <label>Country</label>
          <p>{country || 'N/A'}</p>
        </div>
        <div className="detail region">
          <label>Region</label>
          <p>{region || 'N/A'}</p>
        </div>
        <div className="detail city">
          <label>City</label>
          <p>{city || 'N/A'}</p>
        </div>

      </div>
      <pre>{JSON.stringify(fighter, null, 2)}</pre>
    </div>
  )
};