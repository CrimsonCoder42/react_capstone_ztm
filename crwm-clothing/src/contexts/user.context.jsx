// Import necessary modules from React
import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

// Create a new context called UserContext
export const UserContext = createContext({
  setCurrentUser: () => null, // Default value for setCurrentUser function
  currentUser: null, // Default value for currentUser
});

// Create a UserProvider component
export const UserProvider = ({ children }) => {
  // Declare a state variable currentUser and a function setCurrentUser to update it
  const [currentUser, setCurrentUser] = useState(null);
  
  // Create an object value to hold currentUser and setCurrentUser
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;

  }, [currentUser]);


  // Render the UserContext.Provider component and pass the value prop with the value object
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};