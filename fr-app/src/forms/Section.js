import React from 'react';
import Field from './Field';

export default ({ section = {} }) => {
  const { title, summary, fields = [] } = section;

  return (
    <div className="section">
      <h2>{title}</h2>
      <p>{summary}</p>
      <div className="sections">
        {fields.map((field, key) => <Field key={key} field={field} />)}
      </div>
    </div>
  );
};