import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { useGlobalState } from '../wrappers/GlobalStateWrapper';
import FighterSummary from './FighterSummary';
import { hydrate } from '../data/fighter';

export default () => {
  const { state } = useGlobalState();
  const [fighters, setFighters] = useState([]);

  const { teams } = state;
  const hydrateFighter = hydrate(teams);

  useEffect(() => {
    firebase.firestore()
      .collection('fighters')
      .orderBy('_meta.modified', 'desc')
      .limit(20)
      .get()
      .then(snap => {
        const list = [];
        snap.docs.forEach(doc => {
          list.push(hydrateFighter({ _id: doc.id, ...doc.data() }));
        });
        setFighters(list);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page fighters">
      Fighters
      {fighters.map(fighter => <FighterSummary key={fighter._id} fighter={fighter} />)}
    </div>
  );
};