import React, { useEffect, useState } from 'react';
import { loadLatestReport } from '../../services/report';
import ReportMetrics from './ReportMetrics';
import ReportQuality from './ReportQuality';

export default () => {
  const [report, setReport] = useState({});

  useEffect(() => {
    loadLatestReport().then(setReport);
  }, [setReport]);

  const { metrics, quality } = report || {};

  return (
    <div className="report">
      <ReportMetrics metrics={metrics} />
      <ReportQuality quality={quality} />
    </div>
  );
};