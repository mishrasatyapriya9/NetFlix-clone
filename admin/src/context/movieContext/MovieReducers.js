// reducers take actions and update the state
//step 2
const MovieReducers = (state, action) => {
  switch (action.type) {
    case "GET_MOVIES_START":
      return {
        movies: [],
        isFetching: true,
        error: false,
      };
    case "GET_MOVIES_SUCCESS":
      return {
        movies: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_MOVIES_FAILURE":
      return {
        movies: [],
        isFetching: false,
        error: true,
      };
    case "DELETE_MOVIE_START":
      return {
        ...state,  //we are not changing any inside our movies ,so take our current state
        isFetching: true,
        error: false,
      };
    case "DELETE_MOVIE_SUCCESS":
      return {
        movies: state.movies.filter((movie)=>movie._id !== action.payload),  //checking in the movies array if movie id not equal to id then it donot do anything if id matchs then this id having movie will deleted 
        isFetching: false,
        error: false,
      };
    case "DELETE_MOVIE_FAILURE":
      return {
         ...state,
        isFetching: false,
        error: true,
      };
    case "CREATE_MOVIE_START":
      return {
        ...state,  //we are not changing any inside our movies ,so take our current state
        isFetching: true,
        error: false,
      };
    case "CREATE_MOVIE_SUCCESS":
      return {
        movies: [...state.movies,action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_MOVIE_FAILURE":
      return {
         ...state,
        isFetching: false,
        error: true,
      };
    case "UPDATE_MOVIE_START":
      return {
        ...state,  //we are not changing any inside our movies ,so take our current state
        isFetching: true,
        error: false,
      };
    case "UPDATE_MOVIE_SUCCESS":
      return {
        movies: state.movies.map((movie) => 
          movie._id === action.payload._id && action.payload
        ),
        isFetching: false,
        error: false,
      };
    case "UPDATE_MOVIE_FAILURE":
      return {
         ...state,
        isFetching: false,
        error: true,
      };
    
    default:
      return { ...state };
  }
};
export default MovieReducers;
