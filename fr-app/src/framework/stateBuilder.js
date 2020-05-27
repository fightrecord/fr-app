import React, { createContext, useCallback, useContext, useReducer } from 'react';

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

    const dispatch = useCallback((type, payload) => {
      console.log(stateName, 'dispatch', type, payload);
      rawDispatch({ type, payload });
    }, [rawDispatch]);

    const dispatchSnapshot = useCallback((
      action,
      hydrate = data => data,
      migrate = list => list
    ) => snap => {
      const list = {};
      snap.docs.forEach(doc => list[doc.id] = hydrate({ ...doc.data(), id: doc.id }));
      dispatch(action, migrate(list));
    }, [dispatch]);

    const dispatchNotification = useCallback(level => payload => {
      dispatch('notify', { level, payload });
    }, [dispatch]);

    return {
      state,
      dispatch,
      dispatchSnapshot,
      dispatchNotification
    };
  };

  return {
    StateProvider,
    useStateValue
  };
};
