import { DateTime } from 'luxon';

export const getQualityData = reports => ({
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
    { label: 'Poor', color: '#ffe8e0' },
    { label: 'Fair', color: '#fff0e0' },
    { label: 'Good', color: '#ffffe0' },
    { label: 'Pristine', color: '#f0ffe0' }
  ]
});