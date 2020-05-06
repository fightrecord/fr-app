import React from 'react';
import cx from 'classnames';

export default ({
  fighter: { record } = {},
  onClick = () => null
}) => {

  const filteredRecord = record
    .filter(({ won, lost, draw }) => won || lost || draw);

  return (
    <div className="info record" onClick={onClick}>
      {filteredRecord.length > 0
        ? filteredRecord
          .map((disciplineRecord, key) => {
            const {
              discipline,
              won, lost, draw,
              unConfirmed,
              unconfirmed
            } = disciplineRecord;

            return (
              <div className={cx('detail', 'discipline', {
                unconfirmed: unConfirmed || unconfirmed
              })} key={key}>
                <label>{discipline}</label>
                <p>
                  <span>W:{won}</span>
                  <span>L:{lost}</span>
                  <span>D:{draw}</span>
                  <span>= {won + lost + draw}</span>
                </p>
              </div>
            );
          }) : (
          <p className="no-record">
            No record for this fighter
          </p>
        )}
    </div>
  );
};