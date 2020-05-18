import React from 'react';
import cx from 'classnames';

const Discipline = ({ discipline: { discipline, won, lost, draw } = {}, unconfirmed }) => (
  <div className={cx('detail', 'discipline', { unconfirmed })}>
    <label>{discipline}</label>
    <p>
      <span>W:{won}</span>
      <span>L:{lost}</span>
      <span>D:{draw}</span>
      <span>= {won + lost + draw}</span>
    </p>
  </div>
);


export default ({
  fighter: { record, unconfirmedRecord } = {},
  onClick = () => null
}) => {
  const filteredRecord = record.filter(({ won, lost, draw }) => won || lost || draw);

  return (
    <div className="info record" onClick={onClick}>
      {filteredRecord.length > 0 || unconfirmedRecord
        ? (
          <>
            {filteredRecord.map((discipline, key) => <Discipline discipline={discipline} key={key} />)}
            {unconfirmedRecord && <Discipline discipline={unconfirmedRecord} unconfirmed />}
          </>
        ) : (
          <p className="no-record">
            No record for this fighter
          </p>
        )}
    </div>
  );
};