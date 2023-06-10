// Import necessary modules from React
import { createContext, useState } from "react";

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

  // Render the UserContext.Provider component and pass the value prop with the value object
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};