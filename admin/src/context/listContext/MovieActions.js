//step 1 first created the actions

//create a movie/upload a movie 
export const getListsStart = () => ({
  type: "GET_LIST_START",
});
export const getListsSuccess = (lists) => ({
  type: "GET_LIST_SUCCESS",
  payload: lists,
});
export const getListsFailure = () => ({
  type: "GET_LIST_FAILURE",
});

//Update a movie/upload a movie 
// export const UpdateMovieStart = () => ({
//   type: "UPDATE_MOVIE_START",
// });
// export const UpdateMovieSuccess = (movie) => ({
//     type: "UPDATE_MOVIE_SUCCESS",
//     payload : movie,
// });
// export const UpdateMovieFailure = () => ({
//   type: "UPDATE_MOVIE_FAILURE",
// });

// //fetching the movies
// export const getMoviesStart = () => ({
//   type: "GET_MOVIES_START",
// });
// export const getMoviesSuccess = (movies) => ({
//     type: "GET_MOVIES_SUCCESS",
//     payload : movies,
// });
// export const getMoviesFailure = () => ({
//   type: "GET_MOVIES_FAILURE",
// });


// //delete a movie 
// export const deleteMovieStart = () => ({
//   type: "DELETE_MOVIE_START",
// });
// export const deleteMovieSuccess = (id) => ({
//     type: "DELETE_MOVIE_SUCCESS",
//     payload : id,
// }); //bypassing movie id to delete that movie

// export const deleteMovieFailure = () => ({
//   type: "DELETE_MOVIE_FAILURE",
// });
