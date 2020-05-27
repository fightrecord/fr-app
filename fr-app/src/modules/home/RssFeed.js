import React, { useState, useEffect } from 'react';
import RssParser from 'rss-parser';
import { Icon } from 'react-icons-kit';
import { newspaperO } from 'react-icons-kit/fa';
import Error from '../../framework/common/Error';
import RssFeedItem from './RssFeedItem';

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

export default ({ feedUrl }) => {
  const [{ items = [] }, setFeed] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const parser = new RssParser();
    parser.parseURL(CORS_PROXY + feedUrl)
      .then(setFeed)
      .catch(setError);
  }, [feedUrl]);

  return (
    <div className="rss-feed">
      <h1>News</h1>
      <Error error={error} />
      <div className="news">
        {items.length < 1 && (
          <div className="empty">
            <Icon size={48} icon={newspaperO} />
            <p>There is no news!</p>
          </div>
        )}
        {items.map(item => <RssFeedItem key={item.guid} item={item} />)}
      </div>
    </div>
  );
};
