//step 3
// movie = []
// isfetching
// error

import { createContext, useReducer } from "react";
import MovieReducers from "./MovieReducers";

const INITIAL_STATE = {
  movies:[],
  fetching: false,
  error: false,
};
export const MovieContext = createContext(INITIAL_STATE);

export const MovieContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MovieReducers, INITIAL_STATE);

  return (
    <MovieContext.Provider
      value={{
        movies: state.movies,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
