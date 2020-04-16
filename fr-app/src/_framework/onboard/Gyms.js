import React, { useState } from 'react';
import { plusSquare, minusSquare } from 'react-icons-kit/fa';
import GymList from '../gyms/GymList';
import GymSelector from '../gyms/GymSelector';

export default ({
  label,
  onComplete = () => null,
  onCancel = () => null
}) => {
  const [gyms, setGyms] = useState({});

  const addGym = gym => setGyms({
    ...gyms,
    [gym.name]: gym
  });

  const removeGym = gym => {
    const slimGyms = { ...gyms };
    delete slimGyms[gym.name];
    setGyms(slimGyms);
  };

  return (
    <>
      <p>{label}</p>
      <GymSelector icon={plusSquare} onSelect={addGym} />
      <GymList gyms={gyms} itemIcon={minusSquare} onSelect={removeGym} showEmpty />
    </>
  );
};
