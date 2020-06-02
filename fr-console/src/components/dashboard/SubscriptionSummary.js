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

  const subscriberData = {
    points: reports.map(report => {
      const { _meta: { createdDate }, metrics: { subscribers } = {} } = report;
      const { totalRecords, totalPaidToday } = subscribers || {};

      const dt = DateTime.fromFormat(createdDate, 'yyyy-LL-dd', { zone: 'UTC' });
      const xValue = dt.toMillis();

      return {
        xValue, yValues: [
          totalRecords,
          totalPaidToday
        ]
      };
    }),
    series: [
      { label: 'Total Subscribers' },
      { label: 'Subscribed/Renewed' }
    ]
  };

  const revenueData = {
    points: reports.map(report => {
      const { _meta: { createdDate }, metrics: { subscribers } = {} } = report;
      const { totalRevenueToday } = subscribers || {};

      const dt = DateTime.fromFormat(createdDate, 'yyyy-LL-dd', { zone: 'UTC' });
      const xValue = dt.toMillis();

      return { xValue, yValues: [totalRevenueToday && totalRevenueToday / 100.0] };
    }),
    series: [
      { label: 'Revenue', formatter: val => `£${val.toFixed(2)}` }
    ]
  };

  return (
    <div className="subscription-summary">
      <Chart title="Subscribers over time" data={subscriberData} />
      <Chart title="Revenue over time" data={revenueData} />
    </div>
  );
};