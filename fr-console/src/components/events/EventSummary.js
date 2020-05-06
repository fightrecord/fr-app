import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import Bouts from '../bouts';
import EventSummaryBasic from './EventSummaryBasic';
import EventSummaryCard from './EventSummaryCard';
import EventSummaryQuality from './EventSummaryQuality';
import Spinner from '../Spinner';
import { loadEventHistory } from '../../services/event';
import { loadLatestReport } from '../../services/report';

export default ({ event }) => {
  const [showAdditional, setShowAdditional] = useState(false);
  const [history, setHistory] = useState();
  const [{ quality: { events: { min, max } = {} } = {} }, setReport] = useState({});

  const { _id, _quality = {} } = event;
  const score = _quality.score || 0;

  const getQuartile = score => {
    const interQuartileRange = (max - min) / 4.0;
    const quartile = Math.floor((score - min) / interQuartileRange);
    return quartile > 3 ? 3 : (quartile < 0 ? 0 : quartile); // To handle score === max
  };

  useEffect(() => {
    loadLatestReport().then(report => setReport(report || {}));
  }, [setReport]);

  useEffect(() => {
    if (showAdditional && !history) {
      loadEventHistory(_id).then(setHistory);
    }
  }, [_id, showAdditional, history]);

  const toggleAdditional = () => setShowAdditional(!showAdditional);

  return (
    <div className={cx('smartsearch-summary', 'quality_' + getQuartile(score))}>
      <div className="row">
        <EventSummaryQuality event={event} />
        <EventSummaryBasic event={event} />
        <EventSummaryCard event={event} onClick={toggleAdditional} />
      </div>
      <div className={cx('additional', { shown: showAdditional })}>
        {history
          ? <Bouts bouts={history || []} eventId={_id} />
          : <Spinner />}
      </div>
    </div>
  )
};