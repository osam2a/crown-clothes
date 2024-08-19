import React, { createContext, useState, useEffect, useReducer } from 'react';
import {
  onAuthStateChangedListener,
  getDataFromAuht,
} from '../utils/firebase/firebase.utils';
//as the actual the value you wnat to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

const INITIAL_STATE = {
  currentUser: null,
};

const USER_ACTION_TYPES = {
  SET_CURRENT_USER: `SET_CURRENT_USER`,
};

const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
  }
};
const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (newUser) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: newUser });
  };
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) getDataFromAuht(user);
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserProvider };
