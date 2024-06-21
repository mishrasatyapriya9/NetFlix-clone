//our initial state
//step3

// is = {
//     user: null,
//     fetching: false,
//     error: false,
// };
import { Children, createContext, useReducer } from "react";
import AuthReducer from "./authReducer";

const INITIAL_STATE = {
  user: null,
  fetching: false,
  error: false,
};
export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ Children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {Children}
    </AuthContext.Provider>
  );
};
