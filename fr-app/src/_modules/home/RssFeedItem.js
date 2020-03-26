import React from 'react';
import { DateTime } from 'luxon';
import { Icon } from 'react-icons-kit';
import { caretRight } from 'react-icons-kit/fa';

export default ({ item }) => {
  const { title, creator, isoDate, contentSnippet, link } = item;

  const dateTime = DateTime.fromISO(isoDate);
  const shortenedSnippet = contentSnippet.substring(0, 160) + '...';

  return (
    <div className="rss-feed-item">
      <h1>{title}</h1>
      <h4>{creator} : {dateTime.toLocaleString(DateTime.DATETIME_FULL)}</h4>
      <p>{shortenedSnippet}</p>
      <a href={link} target="_blank" rel="noopener noreferrer">
        Read more...
        <Icon size={16} icon={caretRight} />
      </a>
    </div>
  );
};
