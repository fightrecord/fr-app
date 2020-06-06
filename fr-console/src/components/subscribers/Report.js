import React, { useEffect, useState } from 'react';
import { loadLatestReport } from '../../services/report';
import ReportMetrics from '../reports/ReportMetrics';
import ReportBigNumber from '../reports/ReportBigNumber';

export default () => {
  const [report, setReport] = useState({});

  useEffect(() => {
    loadLatestReport().then(setReport);
  }, [setReport]);

  const { metrics } = report || {};
  const { subscribers } = metrics || {};
  const { totalPaidToday, totalRevenueToday } = subscribers || {};

  return (
    <div className="pre-page report">
      <ReportMetrics metrics={subscribers} labelPrefix="Subcriber" />
      <div className="report-payments">
        <ReportBigNumber label="Paid Yesterday" number={totalPaidToday} />
        <ReportBigNumber label="Revenue Yesterday" number={`£${(totalRevenueToday / 100.0).toFixed(2)}`} />
      </div>
    </div>
  );
};