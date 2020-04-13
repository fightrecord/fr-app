import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { useGlobalState } from '../wrappers/GlobalStateWrapper';

export default () => {
  const { state: { gyms } } = useGlobalState();
  const [suggestions, setSuggestions] = useState([]);
  const [searchText, setSearchText] = useState();

  console.log(gyms);

  useEffect(() => {
    if (!gyms) return;

    const results = Object.values(gyms)
      .filter(({ name = '' }) => name.substring(searchText.length).toLowerCase() === searchText);
    console.log(results);
    setSuggestions(results);
  }, [gyms, searchText]);

  return (
    <div className="gym-selector">
      <input type="text" onChange={ev => setSearchText(ev.target.value.toLowerCase())} />
      <div className={cx('suggestions', { expanded: suggestions.length })}>
        {JSON.stringify(suggestions.null, 2)}
      </div>
    </div>
  );
};
