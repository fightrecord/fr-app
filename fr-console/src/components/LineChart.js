import React from 'react';
import { DateTime } from 'luxon';

export default ({ title, data }) => {
  const { points = [], series = [] } = data;

  if (points.length < 1) return null;

  const makeRange = (values, margin) => {
    let min = Math.min(...values);
    let max = Math.max(...values);
    const range = max - min;

    if (min === max) {
      min = 0;
    }

    min -= range * margin;
    max += range * margin;

    return { min, max, range: max - min };
  };

  const valueMargin = 0.01;

  const xRange = makeRange(
    points
      .map(pt => pt.xValue)
      .filter(val => val != null),
    valueMargin
  );

  const yRange = makeRange(
    points
      .reduce((acc, pt) => [...acc, ...pt.yValues], [])
      .filter(val => val != null),
    valueMargin
  );

  const mapToAreaX = val => {
    const { left, right } = area;
    const { range, min } = xRange;
    const areaRange = right - left;

    return left + (areaRange - (areaRange / range * (val - min)));
  };

  const mapToAreaY = val => {
    const { top, bottom } = area;
    const { range, min } = yRange;
    const areaRange = bottom - top;

    return top + (areaRange - (areaRange / range * (val - min)));
  };

  const width = 1920;
  const height = 150;
  const areaMargin = 10;
  const legendSize = 20;
  const tickLength = 10;

  const area = {
    left: areaMargin,
    right: width - areaMargin,
    top: areaMargin,
    bottom: height - legendSize - areaMargin
  };

  const Axes = ({
    ticks = [],
    formatter = val => val
  }) => {
    const { bottom } = area;
    return (
      <g className="axes">
        <line className="x-axis"
          x1={0}
          y1={bottom}
          x2={width}
          y2={bottom}
        />
        {ticks.map(val => {
          const x = mapToAreaX(val);

          return (
            <g key={val} className="tick">
              <line
                className="x-tick"
                x1={x} y1={bottom}
                x2={x} y2={bottom + tickLength}
              />
              <text
                x={x - areaMargin} y={bottom + tickLength + legendSize}
                className="small"
              >
                {formatter(val)}
              </text>
            </g>
          );
        })}
      </g>
    );
  };

  const DataPoint = ({
    pt: { x, y } = {},
    color,
    formatter = val => val
  }) => {
    const cx = mapToAreaX(x);
    const cy = mapToAreaY(y);

    return (
      <g className="datapoint">
        <circle cx={cx} cy={cy} r="3" style={{ stroke: color, fill: color }} />
        <text x={cx + 7} y={cy} className="small">{formatter(y)}</text>
      </g>
    );
  };

  const segmentsFromData = data => {
    let segments = [];
    let segment;

    data.forEach(pt => {
      if (pt.y) {
        if (segment) {
          segment = [...segment, pt];
        } else {
          segment = [pt];
        }
      } else if (segment) {
        segments = [...segments, segment];
        segment = null;
      }
    });

    if (segment) {
      segments = [...segments, segment];
    }

    return segments;
  }
  const SegmentPath = ({ segment, color }) => {
    const path = segment.map(({ x, y }) => {
      const cx = mapToAreaX(x);
      const cy = mapToAreaY(y);

      return `${cx} ${cy}`;
    }).join(' L');

    return (
      <path d={`M${path}`} style={{ stroke: color }} fill="none" />
    );
  };

  const Series = ({ index, data, color, formatter = val => val }) => {
    const filtered = data.filter(d => d.y != null);

    const segments = segmentsFromData(data);

    return (
      <g className={`series_${index}`}>
        {segments.map((segment, key) => (
          <SegmentPath key={key} segment={segment} color={color} />
        ))}
        {filtered.map((pt, key) => (
          <DataPoint key={key} pt={pt} color={color} formatter={formatter} />
        ))}
      </g>
    );
  };

  return (
    <div className="line-chart">
      <h1>{title}</h1>
      <svg viewBox={`0 0 ${width} ${height}`}>
        <Axes
          ticks={points.map(pt => pt.xValue)}
          formatter={val => DateTime.fromMillis(val).toFormat('dd/MM')}
        />
        {series.map(({ color, formatter }, index) => (
          <Series
            key={index}
            index={index}
            color={color}
            formatter={formatter}
            data={points.map(({ xValue, yValues }) => ({
              x: xValue,
              y: yValues[index]
            }))}
          />
        ))}
      </svg>
      <div className="legend">
        {series.map(({ label, color }, index) => (
          <div
            key={index}
            className={`series_${index}`}
            style={{
              backgroundColor: color,
              borderColor: color
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};