import React from 'react';

export default ({ bout, fighterId }) => {
  const { wasDraw, winnerId, method, round } = bout;

  const result = wasDraw ? 'Draw' : (winnerId === fighterId ? 'Win' : 'Loss');

  const methods = {
    'KO': 'Knock Out',
    'MD': wasDraw ? 'Majority Draw' : 'Majority Decision',
    'Pts': 'Points',
    'RSC': 'Referee Stopped Contest',
    'SD': 'Split Decision',
    'TKO': 'Technical Knock Out',
    'UD': 'Unanimous Decision',
    'Unk': 'N/A',
  };

  return (
    <div className="info result">
      <div className="detail method">
        <label>Result</label>
        <p>{result}</p>
      </div>
      <div className="detail method">
        <label>Details</label>
        <p>{methods[method] || method}, Round {!round || round === 'Unk' ? 'N/A' : round}</p>
      </div>
    </div>
  );
};