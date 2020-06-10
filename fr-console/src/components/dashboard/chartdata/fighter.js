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
    { label: 'Poor', color: '#ffe8e0' },
    { label: 'Fair', color: '#fff0e0' },
    { label: 'Good', color: '#ffffe0' },
    { label: 'Pristine', color: '#f0ffe0' }
  ]
});

export const getCountryData = reports => {
  const { metrics: { fighters = {} } = {} } = reports.slice(-1)[0] || {};
  const { country = {} } = fighters;

  return {
    points: Object.entries(country)
      .sort(([labelA], [labelB]) => labelB.localeCompare(labelA))
      .map(([xValue, count]) => ({
        xValue, yValues: [count]
      })),
    series: []
  };
};
