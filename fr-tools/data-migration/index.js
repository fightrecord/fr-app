const admin = require('firebase-admin');
const ingestData = require('./migrate-ingest');

const serviceAccount = require("../.keys/fight-record-dev-firebase-adminsdk-8y0j7-4e1cf46df4.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fight-record-dev.firebaseio.com"
});

const logResult = label => result => {
  const ids = result.map(doc => doc.id);
  console.log(label, ids, ids.length);
};

const delay = ms => new Promise(resolve => {
  setTimeout(() => resolve(), ms);
});

const collectionToObj = snap => {
  const obj = {};
  snap.docs.forEach(doc => obj[doc.id] = {
    ...doc.data(),
    _id: doc.id
  });
  return obj;
};

const writeToFirestore = async data => {
  const { bouts, classes, events, fighters, teams } = data;
  const db = admin.firestore();

  // Store the teams
  /*logResult('teams')(await Promise.all(
    teams.map(team => db
      .collection('teams')
      .add({ name: team }))
  ));

  // Store the classes
  logResult('classes')(await Promise.all(
    classes.map(className => {
      const nameParts = className.replace('kg', '').split('-');

      const newClass = {
        name: className,
        minWeight: Number(nameParts[0]),
        maxWeight: Number(nameParts[1])
      };

      return db
        .collection('classes')
        .add(newClass);
    })
  ));

  // Load all Classes and Teams
  const allTeams = await db.collection('teams')
    .get()
    .then(collectionToObj)
    .catch(console.error);
  const allClasses = await db.collection('classes')
    .get()
    .then(collectionToObj)
    .catch(console.error);

  const findTeam = name => {
    const team = Object.values(allTeams).find(t => t.name === name);
    return team && team._id;
  };

  const findClass = name => {
    const cls = Object.values(allClasses).find(c => c.name === name);
    return cls && cls._id;
  };

  // Store the fighters
  const fighterArray = Object.values(fighters);

  const mapFighter = fighter => {
    const mapped = { ...fighter };

    if (mapped.class === mapped.weight) {
      delete mapped.weight;
    } else {
      mapped.weight = fighter.weight && Number(fighter.weight.replace('kg'));
    }
    mapped.team = findTeam(fighter.team);
    mapped.class = findClass(fighter.class);

    return mapped;
  };

  const storeFighter = arr => {
    if (arr.length < 1) return;
    const mapped = mapFighter(arr[0]);

    db
      .collection('fighters')
      .add(JSON.parse(JSON.stringify(mapped)))
      .then(doc => console.log(doc.id))
      .then(() => delay(20))
      .then(() => storeFighter(arr.slice(1)));
  };

  storeFighter(fighterArray);

  // Store the events
  logResult('events')(await Promise.all(
    Object.values(events).map(ev => db
      .collection('events')
      .add(ev))
  ));*/

  // Load all Events
  const allEvents = await db.collection('events')
    .get()
    .then(collectionToObj)
    .catch(console.error);

  const findEvent = name => {
    const ev = Object.values(allEvents).find(e => e.name === name);
    return ev && ev._id;
  };

  // Store the bouts
  let boutCount = 0;
  const boutArray = Object.values(bouts).slice(78);

  const mapBout = async allBouts => {
    const bout = allBouts[0];
    const mapped = { ...bout };

    mapped.event = {
      id: findEvent(bout.event),
      name: bout.event.length > 0 ? bout.event : undefined
    };

    const boutFighters = await db.collection('fighters')
      .where('_meta.legacy.ID', 'in', bout.fighterIds)
      .get()
      .then(collectionToObj)
      .catch(console.error);

    const boutFightersArr = Object.values(boutFighters);

    const boutTeamsArr = await Promise.all(
      boutFightersArr.map(({ team }) => team
        ? db.collection('teams')
          .doc(team)
          .get()
          .then(doc => ({ _id: doc.id, ...doc.data() }))
          .catch(console.error)
        : Promise.resolve({})));

    const boutTeams = boutTeamsArr.reduce((acc, { _id, name }) => ({ ...acc, [_id]: name }), {});

    mapped.fighters = boutFightersArr.map(({ name, team, _id }) => ({
      id: _id,
      name,
      teamId: team,
      teamName: boutTeams[team]
    }));

    const winner = boutFightersArr.find(f => f._meta.legacy.ID === bout.winnerId);
    mapped.winnerId = winner ? winner._id : bout.winnerId;
    delete mapped.fighterIds;

    return mapped;
  };

  const storeBout = async arr => {
    if (arr.length < 1) return;
    const mapped = await mapBout(arr[0]);
    const { event } = mapped;

    const boutRef = event.id
      ? db.collection('events').doc(event.id).collection('bouts')
      : db.collection('orphanedBouts');

    boutRef.add(JSON.parse(JSON.stringify(mapped)))
      .then(doc => console.log(boutCount, 'Event', event.id, 'Bout', doc.id))
      .then(() => {
        boutCount++;
        return delay(20);
      })
      .then(() => storeBout(arr.slice(1)));
  };

  storeBout(boutArray);
}

ingestData()
  .then(writeToFirestore)
  .then(() => null)
  .catch(console.error);
