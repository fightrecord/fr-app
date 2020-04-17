import React from 'react';
import BigTickButton from '../../../_framework/common/BigTickButton';

export default ({
  onComplete = () => null,
  onCancel = () => null
}) => {

  return (
    <>
      <p>Are you happy to share your fighter profile?</p>
      <BigTickButton showSadFace />
      <p className="small">
        We'll list your record in our fighter search
        which is provided to all premium members.
        This is a great way to promote yourself,
        however we understand if you'd rather not.
    </p>
    </>
  );
};
