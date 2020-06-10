import React from 'react';
import cx from 'classnames';

const sumValues = values => values.reduce((acc, val) => val ? acc + val : acc, 0);

export default ({
  title,
  data,
  labelFormatter = val => val,
  conditionalColoring = pt => null,
  isHighDensity = false
}) => {
  const { points, series } = data;

  const maxBarSize = Math.max(...points.map(({ yValues }) => sumValues(yValues)));

  const FillerBlock = ({ size }) => (
    <div className="filler" style={{ flex: size }} />
  );

  const Block = ({ size, color }) => (
    <div className="block" style={{ flex: size, backgroundColor: color }}>
      <label>{size}</label>
    </div>
  );

  const Bar = ({ values: { xValue, yValues }, color }) => {

    const barSize = sumValues(yValues);
    const blocks = yValues
      .filter(val => val)
      .map((val, key) => (
        <Block
          key={key}
          size={val}
          color={color || (series[key] && series[key].color)}
        />
      ));

    const fillerSize = maxBarSize - barSize;
    const fillerBlock = <FillerBlock size={fillerSize} />

    return (
      <div className="bar">
        <div className="x-label">
          <label>{labelFormatter(xValue)}</label>
        </div>
        {blocks}
        {fillerSize > 0 && fillerBlock}
      </div>
    );
  };

  return (
    <div className={cx('stacked-bar-chart', { 'high-density': isHighDensity })}>
      <h1>{title}</h1>
      <div className="chart">
        {points.map((pt, key) => (
          <Bar
            key={key}
            values={pt}
            color={conditionalColoring(pt)}
          />
        ))}
      </div>
    </div>
  );
};