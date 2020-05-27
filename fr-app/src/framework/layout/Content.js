import React from 'react';
import cx from 'classnames';
import { useGlobalState } from '../wrappers/GlobalStateWrapper';

export default ({ modules }) => {
  const { state: { currentModule } } = useGlobalState();

  const keys = modules.map(({ key }) => key);
  const offset = keys.indexOf(currentModule);

  return (
    <div className="main-content">
      <div className="main-content-inner" style={{ marginLeft: `-${(offset * 100)}%` }}>
        {modules
          .map(({ render, key }) => (
            <div
              className={cx('module-page', key, { selected: currentModule === key })}
              key={key}
            >
              {render()}
            </div>
          ))}
      </div>
    </div>
  );
};

