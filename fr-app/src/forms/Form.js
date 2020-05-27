import React from "react";
import { useParams } from "react-router-dom";
import Logo from './Logo';
import Modal from './Modal';
import Section from './Section';
import forms from './forms';

export default () => {
  let { formId } = useParams();

  if (forms[formId]) {
    const { title, summary, sections = [] } = forms[formId];

    return (
      <div className="form">
        <Logo />
        <h1>{title}</h1>
        <p>{summary}</p>
        <div className="sections">
          {sections.map((section, key) => <Section key={key} section={section} />)}
        </div>
      </div>
    );
  } else {
    return (
      <Modal
        title="Invalid form"
        message="The form you're trying to access does not live here."
      />
    );
  }
};
