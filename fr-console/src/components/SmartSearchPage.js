import React, { useCallback, useEffect, useState } from 'react';
import cx from 'classnames';
import Selector from './Selector';
import Search from './Search';

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

export default ({
  children,
  className,
  title,
  renderRow = () => null,
  doList = () => Promise.resolve([]),
  doSearch = () => Promise.resolve([])
}) => {
  const [rows, setRows] = useState([]);
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

  const loadRows = useCallback(() => {
    if (isSearching) {
      doSearch(search, limit).then(setRows);
    } else {
      doList(orderBy, direction, limit).then(setRows);
    }
  }, [direction, doList, doSearch, limit, orderBy, search, isSearching]);

  useEffect(loadRows, [loadRows]);

  return (
    <div className={cx('page', 'smartsearch', className)}>
      {children}
      <div className="title">
        <h1>{title}</h1>
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
        {rows.map(renderRow)}
      </div>
    </div>
  );
};