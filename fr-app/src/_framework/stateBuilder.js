import React, { createContext, useContext, useReducer } from 'react';

export default name => {
  const stateName = name;
  const context = createContext();

  const StateProvider = ({ reducer, initialState, children }) => (
    <context.Provider value={useReducer(reducer, initialState)}>
      {children}
    </context.Provider>
  );

  const useStateValue = () => {
    const [state, rawDispatch] = useContext(context);

    const dispatch = (type, payload) => {
      console.log(stateName, 'dispatch', type, payload);
      rawDispatch({ type, payload });
    };

    const dispatchSnapshot = (action, hydrate = d => d) => snap => {
      const list = {};
      snap.docs.forEach(doc => {
        list[doc.id] = hydrate(doc.data(), doc.id);
      });
      dispatch(action, list);
    };

    return [
      state,
      dispatch,
      dispatchSnapshot
    ];
  };

  return {
    StateProvider,
    useStateValue
  };
};
