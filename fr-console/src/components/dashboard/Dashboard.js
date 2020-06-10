import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { loadReport } from '../../services/report';
import Page from '../Page';
import StackedBarChart from '../StackedBarChart';
import DashboardPanel from './DashboardPanel';

import {
  getQualityData as eventQualityData
} from './chartdata/event';

import {
  getQualityData as fighterQualityData,
  getCountryData as fighterCountryData
} from './chartdata/fighter';

import {
  getDailyCount,
  getDailyRevenue
} from './chartdata/subscriber';

export default ({ isSelected }) => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const totalDays = 14;
    const to = DateTime.utc().startOf('day').plus({ days: -1 });
    const from = to.minus({ days: totalDays });

    loadReport(from, to).then(setReports);
  }, [setReports]);

  const timestampToMonth = timestamp => DateTime.fromMillis(timestamp).toFormat('dd/MM');

  const markUndefinedRed = ({ xValue }) => xValue === 'undefined' ? '#ffe8e0' : null;

  return (
    <Page className="dashboard" isSelected={isSelected}>
      <DashboardPanel className="revenue">
        <StackedBarChart
          title="Subscribers"
          data={getDailyCount(reports)}
          labelFormatter={timestampToMonth}
        />
        <StackedBarChart
          title="Revenue"
          data={getDailyRevenue(reports)}
          labelFormatter={timestampToMonth}
        />
      </DashboardPanel>
      <DashboardPanel className="data-quality">
        <StackedBarChart
          title="Fighter Data Quality"
          data={fighterQualityData(reports)}
          labelFormatter={timestampToMonth}
        />
        <StackedBarChart
          title="Event Data Quality"
          data={eventQualityData(reports)}
          labelFormatter={timestampToMonth}
        />
      </DashboardPanel>
      <DashboardPanel className="data-metrics">
        <StackedBarChart
          title="Fighters by Country"
          data={fighterCountryData(reports)}
          conditionalColoring={markUndefinedRed}
          isHighDensity
        />
      </DashboardPanel>
    </Page>
  );
};