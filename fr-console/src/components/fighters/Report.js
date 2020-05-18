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
  const { fighters: fightersMetrics } = metrics || {};
  const { fighters: fightersQuality } = quality || {};

  const { ageGroup = {}, gender = {} } = fightersMetrics || {};
  const miniCharts = [
    { data: ageGroup, sortFunc: (ptA, ptB) => ptA.label.localeCompare(ptB.label) },
    { data: gender, sortFunc: (ptA, ptB) => ptB.value - ptA.value }
  ];

  return (
    <div className="pre-page report">
      <ReportMetrics
        metrics={fightersMetrics}
        labelPrefix="Fighter"
        miniCharts={miniCharts}
      />
      <ReportQuality quality={fightersQuality} />
    </div>
  );
};