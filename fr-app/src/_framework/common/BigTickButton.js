import React, { useState } from 'react';
import { Icon } from 'react-icons-kit';
import { check, times } from 'react-icons-kit/fa';
import cx from 'classnames';

export default ({
  defaultValue = false,
  onChange = () => null
}) => {
  const [checked, setChecked] = useState(false);

  return (
    <div
      className={cx('big-tick-button', { checked })}
      onClick={() => setChecked(!checked)}
    >
      <Icon icon={checked ? check : times} size={48} />
    </div>
  );
};
