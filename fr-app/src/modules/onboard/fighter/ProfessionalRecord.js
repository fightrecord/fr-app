import React from 'react';
import FighterRecord from '../../fighters/FighterRecord';

export default ({
  onComplete = () => null,
  onCancel = () => null
}) => {

  return (
    <>
      <p>It'd be great if you could give us your Professional record.</p>
      <FighterRecord editable />
      <p className="small">If you don't have a Professional record, then leaving 0's in the boxes is just fine.</p>
    </>
  );
};
