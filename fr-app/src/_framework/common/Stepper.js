import React, { useState } from 'react';
import cx from 'classnames';

export default ({
  steps = [],
  onComplete,
  onCancel,
}) => {
  const [step, setStep] = useState(0);

  const canNext = step < steps.length - 1;
  const canPrevious = step > 0;

  const nextStep = () => setStep(canNext ? step + 1 : step);
  const previousStep = () => setStep(canPrevious ? step - 1 : step);

  const stepNumbers = (new Array(steps.length)).fill(0).map((_, index) => index + 1);
  const isCurrent = number => number === step + 1;

  return (
    <div className="stepper">
      {steps && steps.length > 2 && <div className="stepper-progress">
        {stepNumbers.map(number => (
          <div key={number} className={cx('step', { current: isCurrent(number) })}>
            {number}
          </div>
        ))}
      </div>}
      <div className="stepper-inner" style={{ marginLeft: `-${(step * 100)}%` }}>
        {steps.map((step, index) => (
          <div key={index} className="stepper-page">
            {step}
          </div>
        ))}
      </div>
      <div className="stepper-buttons">
        {!canPrevious && onCancel && <button className="secondary" onClick={onCancel}>Cancel</button>}
        {canPrevious && <button className="secondary" onClick={() => previousStep()}>Previous</button>}
        {canNext && <button className="primary" onClick={() => nextStep()}>Next</button>}
        {!canNext && onComplete && <button className="primary" onClick={onComplete}>Done</button>}
      </div>
    </div>
  );
};
