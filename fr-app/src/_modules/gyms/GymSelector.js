import React, { useState, useEffect, useRef } from 'react';
import { Icon } from 'react-icons-kit';
import cx from 'classnames';
import { useGlobalState } from '../../_framework/wrappers/GlobalStateWrapper';
import GymList from './GymList';

const MAX_RESULTS = 3;

export default ({ icon, onSelect = () => null }) => {
  const { state: { gyms } } = useGlobalState();
  const [suggestions, setSuggestions] = useState([]);
  const [searchText, setSearchText] = useState();
  const searchRef = useRef();

  const hasText = searchText && searchText.length > 2;

  const selectGym = gym => {
    if (!hasText) return;
    onSelect(gym || { name: searchText });
    setSearchText();
    searchRef.current.value = '';
  };

  useEffect(() => {
    if (!gyms) return;

    const results = Object.values(gyms)
      .filter(({ searchableName = '' }) => {
        const parts = searchableName.split(' ');
        return searchText && parts.reduce((acc, part) => {
          return acc || part.substring(0, searchText.length) === searchText;
        }, false);
      })
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, MAX_RESULTS);

    setSuggestions(results);
  }, [gyms, searchText]);

  return (
    <div className={cx('gym-selector', { expanded: suggestions.length })}>
      <div className={cx('input', { 'no-text': !hasText })}>
        <input
          ref={searchRef}
          type="text"
          onChange={ev => setSearchText(ev.target.value.toLowerCase())}
          placeholder="Gym Name"
        />
        {icon && <Icon icon={icon} size={20} onClick={() => selectGym()} />}
      </div>
      <GymList
        gyms={suggestions}
        itemIcon={icon}
        onSelect={selectGym}
        className="suggestions"
      />
    </div>
  );
};
