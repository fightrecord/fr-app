import React from 'react';
import ReportBigNumber from './ReportBigNumber';
import ReportMiniChart from './ReportMiniChart';

export default ({ metrics = {} }) => {
  const { fighters: { totalRecords, ageGroup = {}, gender = {} } = {} } = metrics;

  const genderChartData = Object.entries(gender)
    .map(([label, value]) => ({
      label: label === 'undefined' ? 'N/A' : label,
      value
    }))
    .sort((ptA, ptB) => ptB.value - ptA.value);

  const ageChartData = Object.entries(ageGroup)
    .map(([label, value]) => ({
      label: label === 'undefined' ? 'N/A' : label,
      value
    }))
    .sort((ptA, ptB) => ptA.label.localeCompare(ptB.label));

  return (
    <div className="report-metrics">
      <ReportBigNumber label="Fighter records" number={totalRecords} />
      <ReportMiniChart data={genderChartData} />
      <ReportMiniChart data={ageChartData} />
    </div>
  );
};