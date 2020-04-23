
exports.mapHistoryToBout = (events, fighterId) => history => {
  const { opponent, time, result, method, round, event, event_link } = history;

  let winnerId;
  if (result === 'loss') winnerId = opponent;
  else if (result === 'win') winnerId = fighterId;

  return {
    fighterIds: [fighterId, opponent].sort(),
    rules: time,
    wasDraw: !winnerId,
    winnerId,
    event: event_link ? events[event_link].name : event,
    method,
    round
  };
};

exports.groupBouts = allData => {
  const { bouts } = allData;

  const grouped = bouts.reduce((acc, bout) => {
    const { fighterIds } = bout;
    const boutId = fighterIds.join('-');

    return {
      ...acc,
      [boutId]: acc[boutId] ? [...acc[boutId], bout] : [bout]
    };
  }, {});

  return { ...allData, bouts: grouped };
};
