const admin = require('firebase-admin');

const SUCCESSFUL_RESOLUTION = 'ER_SUCCESS_MATCH';

module.exports = async input => {
  console.log('QueryFighterIntentHandler');

  const fighterSlot = input.requestEnvelope.request.intent.slots.Fighter;
  const searchedName = fighterSlot.value;

  const resolutions = fighterSlot.resolutions.resolutionsPerAuthority
    .filter(({ status }) => status.code === SUCCESSFUL_RESOLUTION)
    .reduce((acc, { values }) => [...acc, ...values.map(v => v.value)], []);

  const matchedMultiple = () => {
    return [
      `I know about ${resolutions.length} fighters with the name ${searchedName}.`
    ];
  };

  const matchedOne = async () => {
    console.log(JSON.stringify(resolutions));

    const fighter = await admin.firestore()
      .collection('fighters')
      .doc(resolutions[0].id)
      .get()
      .then(doc => doc.data());

    console.log(JSON.stringify(fighter));

    const { name, city, team: teamId, record = [] } = fighter;

    let team;
    if (teamId) {
      team = await admin.firestore()
        .collection('teams')
        .doc(teamId)
        .get()
        .then(doc => doc.data());

      console.log(JSON.stringify(team));
    }

    const opener = team && city
      ? `${name} is a Muay Thai fighter who fights out of ${team.name} in ${city}.`
      : (city
        ? `${name} is a Muay Thai fighter who fights out of a gym in ${city}.`
        : (team
          ? `${name} is a Muay Thai fighter who fights out of ${team.name}.`
          : `Unfortunately, while we know about ${name}, our database contains very little information.`
        )
      );

    const fightCount = record.reduce((acc, {
      won = 0,
      draw = 0,
      lost = 0
    }) => acc + won + draw + lost, 0);

    const fights = fightCount
      ? [`${name} has had ${fightCount} fights.`]
      : [];

    const more = team || city || fightCount
      ? [
        `Would you like to know more?`,
        `Try saying "What is ${name}'s record?"`,
        `or "Who has ${name} fought?".`
      ] : [];

    return [
      opener,
      ...fights,
      ...more
    ];
  };

  const matchedNone = () => {
    return [
      `I don't know about ${searchedName}.`,
      `If you have information about ${searchedName}, you can submit it in the Fight Record app.`,
      `Our database is growing and we welcome suggestions of who we should include.`
    ];
  };

  let speech;
  if (resolutions.length > 1) {
    speech = matchedMultiple();
  } else if (resolutions.length > 0) {
    speech = await matchedOne();
  } else {
    speech = matchedNone();
  }

  const speechText = speech.join(' ');
  const cardText = 'Hello from Fight Record';

  return input.responseBuilder
    .speak(speechText)
    .withSimpleCard(cardText, speechText)
    .getResponse();
};
