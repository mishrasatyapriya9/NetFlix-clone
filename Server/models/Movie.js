import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    des: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
      default: "",
    },
    imgTitle: {
      type: String,
      default: "",
    },
    imgSm: {
      type: String,
      default: "",
    },
    Trailer: {
      type: String,
      default: "",
    },
    Video: {
      type: String,
      default: "",
    },
    WatchTime: {
      type: String,
      default: "",
    },
    year: {
      type: String,
      default: "",
    },
    limit: {
      type: Number,
      default: "",
    },
    genre: {
      type: String,
      default: "",
    },
    isSeries: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Movie", MovieSchema);
// 'movies' we created in the mongodb database a collection where movie model gonna store
