import Express from "express";
const router = Express.Router();
import ListModel from "../models/List.js";
import verifyTokenAndGetUser from "../Middleware/verifyTokenAndGetUser.js";
import {
  Createlist,
  Deletelist,
  Getlist,
} from "../Controller/ListController.js";
import { upload } from "./../Middleware/MulterMiddleware.js";



router.post("/createList",verifyTokenAndGetUser, Createlist);
router.delete("/Deletelist/:id", verifyTokenAndGetUser, Deletelist);
router.get("/", verifyTokenAndGetUser, Getlist);

export default router;
