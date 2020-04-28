import React, { useCallback, useEffect, useState } from 'react';
import FighterSummary from './FighterSummary';
import Selector from './Selector';
import Search from './Search';
import { loadOrderedFighters, searchOrderedFighters } from '../services/fighter';

const MIN_SEARCH_LENGTH = 2;

const limits = [10, 20, 50, 100, 200];
const defaultLimit = limits[1];
const orderOptions = {
  'Modified Time': '_meta.modified',
  'Data Quality': '_quality.score',
  Name: 'name'
};
const defaultOrderBy = orderOptions['Modified Time'];
const directions = {
  Descending: 'desc',
  Ascending: 'asc'
};
const defaultDirection = directions.Descending;

export default () => {
  const [fighters, setFighters] = useState([]);
  const [limit, setLimit] = useState(defaultLimit);
  const [orderBy, setOrderBy] = useState(defaultOrderBy);
  const [direction, setDirection] = useState(defaultDirection);
  const [search, setSearch] = useState();

  const isSearching = search && search.length > MIN_SEARCH_LENGTH;

  const updateSearch = freeText => {
    if (freeText && freeText.length > MIN_SEARCH_LENGTH) {
      setLimit(limits[0]);
      setOrderBy(orderOptions.Name);
      setDirection(directions.Ascending);
    }
    setSearch(freeText);
  };

  const loadFighters = useCallback(() => {
    if (isSearching) {
      searchOrderedFighters(search, limit)
        .then(setFighters);
    } else {
      loadOrderedFighters(orderBy, direction, limit)
        .then(setFighters);
    }
  }, [direction, limit, orderBy, search, isSearching]);

  useEffect(loadFighters, [loadFighters]);

  return (
    <div className="page fighters">
      <div className="title">
        <h1>Fighters</h1>
        <Search label="Smart Search" onChange={updateSearch} />
        <div className="selectors">
          <Selector
            label="Sort by"
            options={orderOptions}
            onChange={setOrderBy}
            selected={orderBy}
            disabled={isSearching}
          />
          <Selector
            options={directions}
            onChange={setDirection}
            selected={direction}
            disabled={isSearching}
          />
          <Selector
            label="Limit"
            options={limits}
            onChange={setLimit}
            selected={limit}
          />
        </div>
      </div>
      <div className="list">
        <div className="scroller">
          {fighters.map(fighter => <FighterSummary key={fighter._id} fighter={fighter} />)}
        </div>
      </div>
    </div>
  );
};