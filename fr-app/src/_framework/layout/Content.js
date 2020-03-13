import React from 'react';
import cx from 'classnames';
import { useFrameworkState } from '..';

export default ({ modules }) => {
  const [{ currentModule }] = useFrameworkState();

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

