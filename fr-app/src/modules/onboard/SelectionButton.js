import React from 'react';
import cx from 'classnames';
import { Icon } from 'react-icons-kit';
import { check, times } from 'react-icons-kit/fa';
import './SelectionButton.css';

export default ({
  label,
  checked = false,
  onToggle = () => null
}) => (
    <div
      className={cx('selection-button', { checked })}
      onClick={() => onToggle(!checked)}
    >
      <Icon icon={checked ? check : times} />
      <label>{label}</label>
    </div>
  );
