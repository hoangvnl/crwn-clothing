import { createContext } from "react";

const CurrentUserContext = createContext({
  currentUser: undefined,
  setCurrentUser: () => {},
});

export default CurrentUserContext;
