import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { loadReport } from '../../services/report';
import { getQualityData as eventQualityData } from './chartdata/event';
import { getQualityData as fighterQualityData } from './chartdata/fighter';
import { getDailyCount, getDailyRevenue } from './chartdata/subscriber';
import Page from '../Page';
import Chart from '../Chart';
import DashboardPanel from './DashboardPanel';

export default ({ isSelected }) => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const totalDays = 28;
    const to = DateTime.utc().startOf('day').plus({ days: -1 });
    const from = to.minus({ days: totalDays });

    loadReport(from, to).then(setReports);
  }, [setReports]);

  return (
    <Page className="dashboard" isSelected={isSelected}>
      <DashboardPanel className="data">
        <Chart title="Fighter data quality over time" data={fighterQualityData(reports)} />
        <Chart title="Event data quality over time" data={eventQualityData(reports)} />
        <Chart title="Subscribers over time" data={getDailyCount(reports)} />
        <Chart title="Revenue over time" data={getDailyRevenue(reports)} />
      </DashboardPanel>
    </Page>
  );
};