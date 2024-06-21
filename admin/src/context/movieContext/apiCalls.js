//this data is used in PRODUCTLIST.JS
import { getMoviesStart, getMoviesFailure, getMoviesSuccess, deleteMovieStart, deleteMovieSuccess, deleteMovieFailure, createMovieStart, createMovieSuccess, createMovieFailure, UpdateMovieStart, UpdateMovieSuccess, UpdateMovieFailure } from "./MovieActions";
import axios from "axios";
//get movies
 export  const getMovies = async (dispatch) => {
    dispatch(getMoviesStart());
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/movies/`, {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
       console.log(res.data.data);
       dispatch(getMoviesSuccess(res.data.data));
    } catch (error) {
      console.log(error);
      dispatch(getMoviesFailure());
    }
};
  
//delete movie
 export  const deleteMovies = async (id,dispatch) => {
    dispatch(deleteMovieStart());
    try {
      const res = await axios.delete(`${process.env.REACT_APP_API}/api/movies/delete/`+id, {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      if (res) {
         console.log("deleting movie is successfull")
       }
       dispatch(deleteMovieSuccess(res.data.data));
    } catch (error) {
      console.log(error);
      dispatch(deleteMovieFailure());
    }
  };
  
//create movie   THIS IS USED IN NEWPRODUCT.JSX
 export  const createMovie = async (movie,dispatch) => {
    dispatch(createMovieStart());
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/movies/CreateFullMovie`,
        movie,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjI2NzZjZTQ3N2FhOTUzZmM4ZTNhNTYiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MTQzODg5NTEsImV4cCI6MTcyMzAyODk1MX0.qnl0pksYGbbMeaaO3Hdkw4gAj-lYCBt9tH4McFJt2MM"
              // +JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      if (res) {
         console.log("creating a new movie is successfull")
       }
      console.log(res.data);
      dispatch(createMovieSuccess(res.data));
    } catch (error) {
      console.log(error);
      dispatch(createMovieFailure());
    }
  };
  
//update movie
 export  const updateMovie = async (editmovie,dispatch) => {
   dispatch(UpdateMovieStart());
   console.log(editmovie);
    try {
      const res = await axios.put(
       `${process.env.REACT_APP_API}/api/movies/updateFullMovie/${editmovie._id}`,
        editmovie,
        {
          headers: {
            Authorization:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      if (res) {
         console.log("Updating movie is successfull")
       }
      console.log(res.data);
      dispatch(UpdateMovieSuccess(res.data));
    } catch (error) {
      console.log(error);
      dispatch(UpdateMovieFailure());
    }
  };
//this data is used in PRODUCTLIST.JS