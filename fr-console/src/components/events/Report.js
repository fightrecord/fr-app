import React, { useEffect, useState } from 'react';
import { loadLatestReport } from '../../services/report';
import ReportMetrics from '../reports/ReportMetrics';
import ReportQuality from '../reports/ReportQuality';

export default () => {
  const [report, setReport] = useState({});

  useEffect(() => {
    loadLatestReport().then(setReport);
  }, [setReport]);

  const { metrics, quality } = report || {};
  const { events: eventsMetrics } = metrics || {};
  const { events: eventsQuality } = quality || {};

  return (
    <div className="pre-page report">
      <ReportMetrics metrics={eventsMetrics} labelPrefix="Event" />
      <ReportQuality quality={eventsQuality} />
    </div>
  );
};