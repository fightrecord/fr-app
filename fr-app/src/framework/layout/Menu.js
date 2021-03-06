import React from 'react';
import cx from 'classnames';
import { Icon } from 'react-icons-kit';
import { useGlobalState } from '../wrappers/GlobalStateWrapper';

export default ({ modules }) => {
  const { state: { currentModule }, dispatch } = useGlobalState();

  return (
    <div className="main-menu">
      {modules
        .filter(({ inMenu }) => inMenu)
        .map(({ icon, key }) => (
          <div
            className={cx('menu-option', { selected: currentModule === key })}
            key={key}
          >
            <Icon
              size={24}
              icon={icon}
              onClick={() => dispatch('select-module', key)}
            />
          </div>
        ))}
    </div>
  );
};

