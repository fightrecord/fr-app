const path = require('path');

const { processLineByLine } = require('./common');
const { groupBouts, mapHistoryToBout } = require('./migrate-bouts');
const { mapEvent } = require('./migrate-events');
const migrateFighters = require('./migrate-fighters');

const pathToData = path.join(__dirname, '../../_localdata/');
const eventsFile = path.join(pathToData, 'events.csv');
const termsFile = path.join(pathToData, 'terms.csv');

const defaultOutput = {
  events: {},
  fighters: {},
  classes: {},
  teams: {},
  bouts: []
};

const buildSubTables = events => fighters => fighters
  .reduce((acc, fighter) => {
    const { fighters, classes, teams, bouts } = acc;
    const { _meta, class: fighterClass, team, history } = fighter;

    const mappedFighter = { ...fighter };
    delete mappedFighter.history;

    return {
      ...acc,
      fighters: { ...fighters, [_meta.legacy.ID]: mappedFighter },
      classes: { ...classes, [fighterClass]: true },
      teams: team ? { ...teams, [team]: true } : { ...teams },
      bouts: [
        ...bouts,
        ...history.map(mapHistoryToBout(events, _meta.legacy.ID))
      ]
    };
  }, { ...defaultOutput, events });

module.exports = () => Promise.all([

  processLineByLine(eventsFile)
    .then(events => events.map(mapEvent).reduce((acc, ev) => ({
      ...acc,
      [ev._meta.legacy.ID]: ev
    }), {})),

  processLineByLine(termsFile)
    .then(terms => terms
      .reduce((acc, { term_id, name }) => ({
        ...acc,
        [term_id]: name
      }), {}))

])
  .then(([events, terms]) => migrateFighters(pathToData, terms)
    .then(buildSubTables(events))
    .then(groupBouts)
    .then(output => ({
      ...output,
      classes: Object.keys(output.classes),
      teams: Object.keys(output.teams)
    }))
    .then(data => {
      const { events, fighters, classes, teams, bouts } = data;

      console.log(
        'Events', Object.keys(events).length,
        'Fighters', Object.keys(fighters).length,
        'Classes', classes.length,
        'Teams', teams.length,
        'Bouts', Object.keys(bouts).length,
      );

      return data;
    })
    .catch(console.error))
  .catch(console.error);
