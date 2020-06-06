import { DateTime } from 'luxon';

export const getQualityData = reports => ({
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
});
