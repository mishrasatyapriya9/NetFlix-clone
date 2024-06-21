import express from "express";
const app = express();
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import AuthRoute from "./Routes/AuthRoute.js"
import connectDB from "./Config/db.js";
import UserRoute from "./Routes/UserRoute.js"
import UserUpdate from "./Routes/UserUpdate.js"
import cookieParser from "cookie-parser";
import MovieRoute from "./Routes/MovieRoute.js";
import ListRoute from "./Routes/ListRoute.js"
// require("dotenv").config();
import mongoose from "mongoose";
dotenv.config();
// app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Replace with your frontend URL
//     // origin: "http://localhost:4000",
//     credentials: true, // If you are using cookies or sessions
//   })
// );
// Allow CORS for specific origins
const allowedOrigins = ["http://localhost:5173", "http://localhost:4000"];
app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the origin is allowed or if it's a request from a browser extension (e.g., React DevTools)
      if (!origin || allowedOrigins.includes(origin) || origin.startsWith("chrome-extension://")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // If you are using cookies or sessions
  })
);

app.use(express.json());
//now we can send json data in req and res
app.use(morgan("dev"));
app.use(cookieParser())

app.use("/api/auth/", AuthRoute)
app.use("/api/users/", UserRoute);
app.use("/api/movies/", MovieRoute);
app.use("/api/lists/", ListRoute);

//databse config
connectDB();






const PORT = process.env.PORT || 8800;
const MODE = process.env.DEV_MODE;
app.listen(PORT, () => {
  console.log(
    `Server  is running in ${MODE} MODE IN port no ${PORT}`.bgCyan.black
  );
});
