import React from 'react';
import BigTickButton from '../../common/BigTickButton';

export default ({
  onComplete = () => null,
  onCancel = () => null
}) => {

  return (
    <>
      <p>Are you happy to share your coaching profile?</p>
      <BigTickButton showSadFace />
      <p className="small">
        We'll list this profile in our coach search
        which is provided to all premium members.
        This is a great way to attract clients,
        however we understand if you'd rather not.
    </p>
    </>
  );
};
