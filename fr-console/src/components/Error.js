import React from 'react';

export default ({ error }) => {

  return error ? (
    <div className="error">
      Error: {JSON.stringify(error, null, 2)}
    </div>
  ) : null;
};