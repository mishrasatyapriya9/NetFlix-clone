import Express from "express";
const router = Express.Router();
import verifyUpdateAuth from "../Middleware/verifyUpdateAuth.js";
import Movie from "../models/Movie.js";
import verifyTokenAndGetUser from "../Middleware/verifyTokenAndGetUser.js";
import toast from "react-hot-toast";
import {
  DeleteMovie,
  UploadMovie,
  UpdateMovie,
  GetMovie,
  GetAllMovie,
  RandomMovies,
  UploadNewMovieWithAllDetails,
  UpdateMovieAllDetails,
} from "../Controller/MovieController.js";
import { upload } from "./../Middleware/MulterMiddleware.js";

// create a new movie with all details  ,pic and videos are uploaded in the firebase through frontend
router.post(
  "/CreateFullMovie",
  verifyTokenAndGetUser,
  UploadNewMovieWithAllDetails
);
// update a new movie with all details  ,pic and videos are uploaded in the firebase through frontend
router.put("/updateFullMovie/:id", verifyTokenAndGetUser, UpdateMovieAllDetails);
// create a new movie with some details,pic and videos are uploaded multer and cludinary through backend code

router.post(
  "/create",
  upload.fields([
    {
      name: "Video",
      maxCount: 1,
    },
    {
      name: "img",
      maxCount: 1,
    },
  ]),
  verifyTokenAndGetUser,
  UploadMovie
);
//edit a movie details with some details
router.put(
  "/update/:id",
  upload.fields([
    {
      name: "Video",
      maxCount: 1,
    },
    {
      name: "img",
      maxCount: 1,
    },
  ]),
  verifyTokenAndGetUser,
  UpdateMovie
);

router.delete("/delete/:id", verifyTokenAndGetUser, DeleteMovie);
router.get("/find/:id", verifyTokenAndGetUser, GetMovie);
router.get("/", verifyTokenAndGetUser, GetAllMovie);
router.get("/random", verifyTokenAndGetUser, RandomMovies);

export default router;
