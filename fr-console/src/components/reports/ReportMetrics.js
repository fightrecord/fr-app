import React from 'react';
import ReportBigNumber from './ReportBigNumber';
import ReportMiniChart from './ReportMiniChart';

export default ({ metrics = {}, labelPrefix, miniCharts = [] }) => {
  const { totalRecords } = metrics;

  const makeData = ({ data, sortFunc }) => Object.entries(data)
    .map(([label, value]) => ({
      label: label === 'undefined' ? 'N/A' : label,
      value
    }))
    .sort(sortFunc);

  return (
    <div className="report-metrics">
      <ReportBigNumber label={`${labelPrefix || 'Total'} records`} number={totalRecords} />
      {miniCharts
        .map(chart => makeData(chart))
        .map((data, key) => <ReportMiniChart key={key} data={data} />)}
    </div>
  );
};