import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { loadReport } from '../../services/report';

export default () => {
  const [reports, setReports] = useState([]);

  const totalDays = 30;

  const to = DateTime.utc().startOf('day').minus({ days: 1 });
  const from = to.minus({ days: totalDays });

  useEffect(() => {
    loadReport(from, to).then(setReports);
  }, [setReports]);

  const fighterQuality = reports
    .reduce((acc, {
      _meta: { createdDate }, quality: { fighters: { quartiles } = {} }
    }) => ({ ...acc, [createdDate]: quartiles }), {});

  const eventQuality = reports
    .reduce((acc, {
      _meta: { createdDate }, quality: { events: { quartiles } = {} }
    }) => ({ ...acc, [createdDate]: quartiles }), {});

  const initQuartiles = () => (new Array(4)).fill(0);

  const days = (new Array(totalDays)).fill(0).map((_, offset) => {
    const date = to.minus({ days: offset }).toISODate();
    const dateText = to.minus({ days: offset }).toFormat('dd/MM');

    const fighters = fighterQuality[date]
      ? Object.entries(fighterQuality[date])
        .reduce((acc, [key, value]) => {
          const newArr = [...acc];
          newArr[key] = value;
          return newArr;
        }, initQuartiles())
      : initQuartiles();

    const events = eventQuality[date]
      ? Object.entries(eventQuality[date])
        .reduce((acc, [key, value]) => {
          const newArr = [...acc];
          newArr[key] = value;
          return newArr;
        }, initQuartiles())
      : initQuartiles();

    return {
      date,
      dateText,
      fighters,
      events
    };
  });

  return (
    <div className="widget data-trend">
      <h1>Fighter data quality over time</h1>
      <div className="stacked-bar-chart">
        {days.map(({ date, dateText, fighters }) => (
          <div key={date} className="bar-set">
            <div className="volumes">
              {fighters.map((total, index) => (
                <div key={index} className={`quartile_${index}`} style={{ flex: total ? total : '0 0 2px' }}>
                  {total ? total : null}
                </div>
              ))}
            </div>
            <label>{dateText}</label>
          </div>
        ))}
      </div>
      <h1>Event data quality over time</h1>
      <div className="stacked-bar-chart">
        {days.map(({ date, dateText, events }) => (
          <div key={date} className="bar-set">
            <div className="volumes">
              {events.map((total, index) => (
                <div key={index} className={`quartile_${index}`} style={{ flex: total ? total : '0 0 2px' }}>
                  {total ? total : null}
                </div>
              ))}
            </div>
            <label>{dateText}</label>
          </div>
        ))}
      </div>
    </div>
  );
};