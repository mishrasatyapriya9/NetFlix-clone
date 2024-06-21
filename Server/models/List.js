import mongoose from "mongoose";
//ctrl +d foe choosing same name 

const ListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
        type: String,
        //movies or series
    },
    genre: {
      type: String,
      default: "",
    },
    content: {
        type: Array,
        //we gonna store all movies in one row ,not all the details but only thhe ID
    },
  },
  { timestamps: true }
);

export default mongoose.model("List", ListSchema);
// 'Lists' we created in the mongodb database a collection where List model gonna store
