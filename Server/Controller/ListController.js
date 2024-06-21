import asyncHandler from "./../utils/asyncHandler.js";
import ApiError from "./../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import List from "../models/List.js";
import { Mongoose } from "mongoose";

//title,type,genre,content these are record in the mode

//@description     Createlist
//@route           POST method,  http://localhost:8800/api/lists/createList
//@access          private  = pass the token in the header or by cookies

export const Createlist = asyncHandler(async (req, res) => {
  if (req.user.isAdmin) {
    const { title, type, genre, content } = await req.body;

    if (!title || !type || !genre || !content) {
      throw new ApiError(
        404,
        "title or anything is missing in the body ,give title, type,genre,content in the body"
      );
    }

    const listdata = await List.create({
      title,
      type,
      genre,
      content,
    });
    if (!listdata) {
      throw new ApiError(400, "Error in creating the Lists");
    }

    return res
      .status(201)
      .json(new ApiResponse(200, listdata, "new Lists created  successfully"));
  } else {
    return res
      .status(400)
      .json(new ApiResponse(400, "You are not authorized to create a List"));
  }
  
});


//@description     Deletelist
//@route           DELETE method,  http://localhost:8800/api/lists/Deletelist/661bacac6a167ca66cabfae0
//@access          private  = pass the token in the header or by cookies

export const Deletelist = asyncHandler(async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const id = req.params.id;
      const deletelist = await List.findByIdAndDelete(id);
      if (!deletelist) {
        return res
          .status(400)
          .json(new ApiResponse(400, "List can't deleted successfully"));
      }
      return res
          .status(200)
          .json(new ApiResponse(200, "List is deleted successfully"));
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "there is a problem in deleteing the List",
      });
    }
  } else {
    return res
      .status(400)
      .json(new ApiResponse(400, "You are not authorized to delete a List"));
  }
});


//@description     GetAlist
//@route           GET method,  
//@access          private  = pass the token in the header or by cookies
//http://localhost:8800/api/lists/  GET ALL TYPE OF LISTS
//http://localhost:8800/api/lists?type=series GET SERIES ONLY
//http://localhost:8800/api/lists?type=series&genre=horror  get according to API WE WRITTEN
export const Getlist = asyncHandler(async (req, res) => {
  try {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre; //these things selectedd by user in frontend by dropdown and button
    let list = [];
    try {
      if (typeQuery) {
        if (genreQuery) {
          list = await List.aggregate([
            {
              $sample: {
                size:10,
              }
            },
            {
              $match: {
                type:typeQuery,genre:genreQuery
              }
            }
          ])
        } else {
          list = await List.aggregate([
            {
              $sample: {
                size: 10,
              },
            },
            {
              $match: {
                type: typeQuery,
              },
            },
          ]);
        }
        
      } else {
        list = await List.aggregate([
          {
            $sample: {
              size: 10
            }
          }
        ])
      }
    } catch (error) {
      res.status(400).json({
        error
      })
    }
    return res.status(200).json({
      success: true,
      list
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "there is a message in the getting the list ,check controller",
      error
    })
  }
});