import React from 'react';

export default ({ fighter: { record } = {} }) => {

  const filteredRecord = record
    .filter(({ discipline, won, lost, draw }) => discipline || won || lost || draw);

  return (
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
  );
};