import "./Featured.scss";
import venom from "../../assets/navbar/venombackground.jpeg";
import title from "../../assets/navbar/Venomlogo.jpeg";
import { PlayCircle, InfoOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";

const Featured = ({ type }) => {
  const [content, setContent] = useState({});
  useEffect(() => {
    const fetchcontent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/movies/random?type=${type}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFiYThlZWIzZGM2YjY4OTk3NzdlMzQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MTMwODg4MDUsImV4cCI6MTcxMzY5MzYwNX0.9HNblZnIadDAI3LX_nYXp2fmNtGo3f9pVJAMv90c15k",
            },
          }
        );
        setContent(res.data.movie[0]);
        console.log(res.data.movie[0]); //putted [0] because it is array format
      } catch (error) {
        console.log(error);
      }
    };
    fetchcontent();
  }, [type]);
  
  
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "movies" : "series"}</span>
          <select name="genre" id="genre">
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
            <option value="animation">Animation</option>
            <option value="biography">Biography</option>
            <option value="comedy">comedy</option>
            <option value="comedy">horror</option>
            <option value="comedy">romantic</option>
            <option value="crime">Crime</option>
            <option value="documentary">Documentary</option>{" "}
          </select>
        </div>
      )}
      {/* src={venom} */}
      <img src={content.img} alt="" className="bgimg" />
      <div className="info">
        {/* src={title} */}
        <img src={content.imgTitle} alt="" className="titleimg" />
        <span className="desc">
          {content.des}
        </span>
        <div className="buttons">
          <button className="play">
            <PlayCircle />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
