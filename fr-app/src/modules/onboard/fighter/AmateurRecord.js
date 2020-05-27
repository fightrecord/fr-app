import React from 'react';
import FighterRecord from '../../fighters/FighterRecord';

export default ({
  onComplete = () => null,
  onCancel = () => null
}) => {

  return (
    <>
      <p>It'd also be nice to know your Amateur/Novice record.</p>
      <FighterRecord editable />
    </>
  );
};
