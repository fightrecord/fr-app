exports.assessDataQuality = contextName => input => {
  const { quality } = input;

  const list = input[contextName];
  const { maxScore, minScore } = quality[contextName];

  const metrics = {
    count: 0,
    total: 0,
    max: maxScore,
    min: minScore,
    median: ((maxScore - minScore) * 0.5) + minScore,
    quartiles: {}
  };

  const incrementCount = (propName, value) => {
    const currentCount = metrics[propName][value];
    const newCount = currentCount ? currentCount + 1 : 1;
    metrics[propName] = Object.assign(metrics[propName], {
      [value]: newCount
    });
  };

  const getQuartile = score => {
    const interQuartileRange = (maxScore - minScore) / 4.0;
    const quartile = interQuartileRange
      ? Math.floor((score - minScore) / interQuartileRange)
      : 3;
    return quartile > 3 ? 3 : quartile; // To handle score === maxScore
  };

  list.forEach(record => {
    const { _quality: { score } = {} } = record;

    const quartile = score ? getQuartile(score) : score;

    metrics.count += 1;
    metrics.total += score || 0;
    incrementCount('quartiles', quartile);
  });

  metrics.average = metrics.total / metrics.count;

  return Object.assign(input, {
    quality: Object.assign(quality, { [contextName]: metrics })
  });
};
