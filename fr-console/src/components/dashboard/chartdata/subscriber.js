import { DateTime } from 'luxon';

export const getDailyCount = reports => ({
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
});

export const getDailyRevenue = reports => ({
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
});
