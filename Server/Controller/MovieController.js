import asyncHandler from "./../utils/asyncHandler.js";
import ApiError from "./../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Movie from "../models/Movie.js";
import { v2 as cloudinary } from "cloudinary";
import { Mongoose } from "mongoose";

//@description     Upload a new  movie with all the details for a movie
//@route           POST method,  http://localhost:8800/api/movies/CreateFullMovie
//@access          private  = pass the token in the header or by cookies

export const UploadNewMovieWithAllDetails = asyncHandler(async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
  // try {
  //   const newMovie = new Movie(req.body);
  //    const savedMovie = await newMovie.save();
  //   if (!savedMovie) {
  //     throw new ApiError(
  //       400,
  //       "New movie donot created in the database,some error"
  //     );
  //   }
  //   return res
  //     .status(201)
  //     .json(
  //       new ApiResponse(
  //         201,
  //         savedMovie,
  //         "new movie uploaded successfully with all the deatils"
  //       )
  //     );
  // } catch (error) {
  //   throw new error;
  //   res.status(403).json("You are not allowed!");
  // }
});

//@description     Update a new  movie with all the details for a movie
//@route           Put method,  http://localhost:8800/api/movies/updateFullMovie
//@access          private  = pass the token in the header or by cookies

export const UpdateMovieAllDetails = asyncHandler(async (req, res) => {
  try {
    const id = req.params._id;
    console.log(id);
    const moviedata = req.body;
    const updatedMovie = await Movie.findByIdAndUpdate(id, moviedata, {
      new: true,
    });
    // const updateMovie = new Movie(req.body);
    //  const updatedMovie = await updateMovie.save();
    if (!updatedMovie) {
      throw new ApiError(
        400,
        "New movie donot updated in the database,some error"
      );
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          201,
          updatedMovie,
          "movie updated successfully with all the deatils"
        )
      );
  } catch (error) {
    throw new error();
    res.status(403).json("You are not allowed!");
  }
});

//@description     Upload  movie
//@route           POST method,  http://localhost:8800/api/movies/create
//@access          private  = pass the token in the header or by cookies

export const UploadMovie = asyncHandler(async (req, res) => {
  const { title, des, isSeries } = await req.body;

  if (!title && !des) {
    throw new ApiError(
      404,
      "title and description must be given,these are not found in the body"
    );
  }
  const videoLocalpath = req.files.Video[0]?.path; //Video is defined as same name in model
  const movieimageLocalpath = req.files.img[0]?.path; //tumbnail of movie video
  if (!videoLocalpath) {
    throw new ApiError(404, "LOCALpath of video/movie not found");
  }
  if (!movieimageLocalpath) {
    throw new ApiError(404, "LOCALpath movie image/tumbneil not found");
  }

  //   {
  //     "success": false,
  //     "error": "E11000 duplicate key error collection: NetflixClone.movies index: title_1 dup key: { title: \"spiderman\" }"
  // }
  //error shows because in the model define we created that title and des must be unique

  // const videourl = await uploadOnCloudinary(videoLocalpath);
  //const tumbnail = await uploadOnCloudinary(movieimageLocalpath);
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  const videourl = await cloudinary.uploader.upload(videoLocalpath, {
    resource_type: "auto",
  });
  const tumbnail = await cloudinary.uploader.upload(movieimageLocalpath, {
    resource_type: "auto",
  });

  if (!videourl) {
    throw new ApiError(
      404,
      "videourl of video/movie can not retrived from cloudinary"
    );
  }
  if (!tumbnail) {
    throw new ApiError(
      404,
      "tumbnail of movie image/tumbneil not retrived from cloudinary"
    );
  }
  const movie = await Movie.create({
    title,
    des,
    Video: videourl?.url,
    img: tumbnail?.url || "",
    WatchTime: videourl?.duration || " ",
    isSeries,
  });
  if (!movie) {
    throw new ApiError(400, "New movie donot created in the databse");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, movie, "new movie uploaded successfully"));
});

//@description     Update Uploaded  movie
//@route           PUT ,    http://localhost:8800/api/movies/update/661a6b9637009dc4b302c958
//@access          private  = pass the token in the header or by cookies

export const UpdateMovie = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { title, des } = await req.body;

  if (!title && !des) {
    throw new ApiError(
      404,
      "title and description must be given,these are not found in the body"
    );
  }
  const videoLocalpath = req.files.Video[0]?.path; //Video is defined as same name in model
  const movieimageLocalpath = req.files.img[0]?.path; //tumbnail of movie video
  if (!videoLocalpath) {
    throw new ApiError(404, "LOCALpath of video/movie not found");
  }
  if (!movieimageLocalpath) {
    throw new ApiError(404, "LOCALpath movie image/tumbneil not found");
  }

  //This cloudinary way is not working ,so i write the cloudinary code here insted of another file ,by bypassing the url of any video|| img cant retrived
  //const videourl = await uploadOnCloudinary(videoLocalpath);
  //const tumbnail = await uploadOnCloudinary(movieimageLocalpath);
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  const videourl = await cloudinary.uploader.upload(videoLocalpath, {
    resource_type: "auto",
  });
  const tumbnail = await cloudinary.uploader.upload(movieimageLocalpath, {
    resource_type: "auto",
  });

  if (!videourl) {
    throw new ApiError(
      404,
      "videourl of video/movie can not retrived from cloudinary"
    );
  }
  if (!tumbnail) {
    throw new ApiError(
      404,
      "tumbnail of movie image/tumbneil not retrived from cloudinary"
    );
  }
  const Updatedmovie = await Movie.findByIdAndUpdate(
    id,
    {
      $set: {
        title,
        des,
        Video: videourl?.url,
        img: tumbnail?.url || "",
        WatchTime: videourl?.duration || " ",
      },
    },
    {
      new: true,
    }
  );

  if (!Updatedmovie) {
    throw new ApiError(
      400,
      "New movie Details can't Updated check in MovieController.js file"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, Updatedmovie, "Movie Details Updated successfully")
    );
});

//@description    Delete  movie
//@route          Delete ,    http://localhost:8800/api/movies/delete/661a6b9637009dc4b302c958
//@access         private  = pass the token in the header or by cookies

export const DeleteMovie = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const Deletemovie = await Movie.findByIdAndDelete(id);

  if (!Deletemovie) {
    throw new ApiError(
      400,
      "New movie Details can't Deleted || there is no movie in this ID || check in MovieController.js file and DeleteMovie controller"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, Deletemovie, "Movie Details Deleted successfully")
    );
});

//@description    get  movie
//@route          GET ,    http://localhost:8800/api/movies/find/661a74cd57de1f69f5bf5e41
//@access         private  = pass the token in the header or by cookies

export const GetMovie = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw console.error("id is not givven");
  }
  const Getmovie = await Movie.findById(id);

  if (!Getmovie) {
    throw new ApiError(400, "Error in retriving the movie");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, Getmovie, "Error in retriving the movie"));
});

//@description    get ALL  movie
//@route          GET ,    http://localhost:8800/api/movies/
//@access         private  = pass the token in the header or by cookies

export const GetAllMovie = asyncHandler(async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const GetAll = await Movie.find();

      if (!GetAll) {
        throw new ApiError(400, "Error in retriving the movie");
      }

      return res
        .status(201)
        .json(new ApiResponse(200, GetAll, "Error in retriving the movie"));
    } catch (error) {
      res.status(400).json(new ApiError(400, "Error in the getting all users"));
    }
  } else {
    res.status(400).json({
      success: false,
      message:
        "you are not authorized to get all Users || put the admin accesstoken in the header",
    });
  }
});

//@description    get Random  movie
//@route          GET ,    http://localhost:8800/api/movies/
//@access         private  = pass the token in the header or by cookies
//if the url is   https..../random?type=series ||/random?type=movie must give the random series or  movies
//url are http://localhost:8800/api/movies/random?type=movies shows the movies which isSeries is false
//http://localhost:8800/api/movies/random get random movie
// http://localhost:8800/api/movies/random?type=series  SHOWS THE MOVIES WHCIH isSeries is true
export const RandomMovies = asyncHandler(async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type == "series") {
      movie = await Movie.aggregate([
        {
          $match: {
            // _id:Mongoose.Schema.Types.ObjectId(req.user.id),
            isSeries: true,
          },
        },
        {
          $sample: {
            size: 1,
          },
        },
        // , {
        //   $project: {
        //     title: 1,
        //     des:1
        //   }
        // },
      ]);
    } else {
      movie = await Movie.aggregate([
        {
          $match: {
            isSeries: false,
          },
        },
        {
          $sample: {
            size: 1,
          },
        },
      ]);
    }

    return res.status(200).json({
      movie,
    });
  } catch (error) {
    return res
      .status(400)
      .json(new ApiError(400, movie, "Error in retriving the movie or series"));
  }
});
