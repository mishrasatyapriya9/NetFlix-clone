//our initial state
//step3

// is = {
//     user: null,
//     fetching: false,
//     error: false,
// };
import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer.js";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  fetching: false,
  error: false,
};
export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  useEffect(()=>{
    localStorage.setItem('user', JSON.stringify(state.user));
  },[state.user])

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
