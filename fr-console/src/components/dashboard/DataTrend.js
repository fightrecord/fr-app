import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { loadReport } from '../../services/report';
import Chart from '../Chart';

export default () => {
  const [reports, setReports] = useState([]);

  const totalDays = 28;

  const to = DateTime.utc().startOf('day').plus({ days: -1 });
  const from = to.minus({ days: totalDays });

  useEffect(() => {
    loadReport(from, to).then(setReports);
  }, [setReports]);

  const fighterData = {
    points: reports.map(report => {
      const { _meta: { createdDate }, quality: { fighters = {} } } = report;
      const { quartiles = {} } = fighters || {};

      const dt = DateTime.fromFormat(createdDate, 'yyyy-LL-dd', { zone: 'UTC' });
      const xValue = dt.toMillis();

      return {
        xValue, yValues: [
          quartiles[0],
          quartiles[1],
          quartiles[2],
          quartiles[3]
        ]
      };
    }),
    series: [
      { label: 'Poor', color: '#f43' },
      { label: 'Fair', color: '#f63' },
      { label: 'Good', color: '#fc3' },
      { label: 'Pristine', color: '#6f3' }
    ]
  };

  const eventData = {
    points: reports.map(report => {
      const { _meta: { createdDate }, quality: { events = {} } } = report;
      const { quartiles = {} } = events || {};

      const dt = DateTime.fromFormat(createdDate, 'yyyy-LL-dd', { zone: 'UTC' });
      const xValue = dt.toMillis();

      return {
        xValue, yValues: [
          quartiles[0],
          quartiles[1],
          quartiles[2],
          quartiles[3]
        ]
      };
    }),
    series: [
      { label: 'Poor', color: '#f43' },
      { label: 'Fair', color: '#f63' },
      { label: 'Good', color: '#fc3' },
      { label: 'Pristine', color: '#6f3' }
    ]
  };

  return (
    <div className="widget data-trend">
      <Chart title="Fighter data quality over time" data={fighterData} />
      <Chart title="Event data quality over time" data={eventData} />
    </div>
  );
};