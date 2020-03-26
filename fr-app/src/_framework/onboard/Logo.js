import React, { useEffect } from 'react';
import { Icon } from 'react-icons-kit';
import { angleDoubleRight } from 'react-icons-kit/fa';

const TIMEOUT = 5000;

export default ({
  selected = false,
  onComplete = () => null,
  onTimeout = () => null
}) => {

  useEffect(() => {
    if (!selected) return;
    const timeoutHandler = setTimeout(() => onTimeout(), TIMEOUT);
    return () => clearTimeout(timeoutHandler);
  }, [selected, onTimeout]);

  return (
    <div className="onboard-content logo darkred-red">
      <div className="inner" />
      <h1>Fight Record</h1>
      <Icon icon={angleDoubleRight} size={100} onClick={onComplete} />
    </div>
  );
};
