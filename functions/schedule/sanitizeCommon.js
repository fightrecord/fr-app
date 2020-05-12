const { DateTime } = require('luxon');

const processSnapshot = snapshot => snapshot.docs
  .map(doc => Object.assign(
    doc.data(),
    { _id: doc.id }
  ));

exports.processSnapshot = processSnapshot;

exports.assessDataQuality = (rules, app) => async fighter => {
  const { _meta } = fighter;

  const now = DateTime.utc().toISO();
  const results = await Promise.all(rules.map(rule => rule(fighter, app)));

  const quality = results.reduce((
    { score, actions, amends },
    [ruleScore, ruleActions, ruleAmends]
  ) => ({
    score: score + ruleScore,
    actions: [...actions, ...ruleActions],
    amends: Object.assign(amends, ruleAmends)
  }), { score: 0, actions: [], amends: {} });

  const { score, actions, amends } = quality;
  const updated = Object.assign(fighter, amends, {
    _quality: { score, actions },
    _meta: Object.assign(_meta, {
      lastQuality: now,
      modified: now
    })
  });

  return updated;
};

exports.loadOldestRecords = (collectionName, batchSize, app = admin) => {
  const ref = app.firestore()
    .collection(collectionName);

  const orderBy = ['_meta.lastQualityAssessment', '_meta.modified'];

  return Promise
    .all(orderBy
      .map(orderBy => ref
        .orderBy(orderBy, 'asc')
        .limit(batchSize)
        .get()
        .then(processSnapshot)));
};

exports.prioritiseLegacyRecords = results => {
  const legacyRecords = results[1].filter(f => !f._meta.lastQualityAssessment);
  return legacyRecords.length ? legacyRecords : results[0];
};
