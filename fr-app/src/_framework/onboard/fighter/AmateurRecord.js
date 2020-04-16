import React from 'react';
import FightRecord from '../../common/FightRecord';

export default ({
  onComplete = () => null,
  onCancel = () => null
}) => {

  return (
    <>
      <p>It'd be great if you could give us your Amateur/Novice record.</p>
      <FightRecord editable />
    </>
  );
};
