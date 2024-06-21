import "./Listitem.scss";
import PropTypes from "prop-types";
// import cardimg from "../../assets/navbar/venom2.jpg";
// import video from "../../assets/listcard/venomvideo.mp4";
import { Link, Navigate } from "react-router-dom";
import {
  PlayArrow,
  Add,
  ThumbUpOutlined,
  ThumbDownOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import Watch from "../../Pages/Watch/Watch";

const Listitem = async (props) => {
  const [ishovered, setIshovered] = useState(false);
  const [movie, setMovie] = useState({});
  useEffect(() => {
    console.log(dat);
    const fetchmovie = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/movies/find/" + dat,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFiYThlZWIzZGM2YjY4OTk3NzdlMzQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MTMwODg4MDUsImV4cCI6MTcxMzY5MzYwNX0.9HNblZnIadDAI3LX_nYXp2fmNtGo3f9pVJAMv90c15k",
          },
        }
      );
      console.log(res.data.data);
      console.log(res.data);
      setMovie(res.data.data);
    };
    fetchmovie();
  }, []);
  // const handleClick = () => {
  //   Navigate("/Watch", { state: { movie } });
  // }

  return (
    <>
      {/* <Link to={{ pathname: "/Watch", state: movie }} className="link"> */}
      <p style={{ color: "red" }}> {dat}</p>
      <div
        className="listitem"
        style={{ left: ishovered && index * 225 - 50 + index * 5 ,transition:""}}
        onMouseEnter={() => setIshovered(true)}
        onMouseLeave={() => setIshovered(false)}
      >
        <img src={movie?.img} alt="" className="" />
        {ishovered && (
          <>
            <video src={movie?.Video} autoPlay={true} loop />
            <div className="iteminfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="iteminfoTop">
                <span>{movie?.WatchTime}</span>
                <span className="limit">+{movie?.limit}</span>
                <span>{movie?.year}</span>
              </div>
              <div className="desc">{movie?.des}</div>
              <div className="genre">{movie?.genre}</div>
            </div>
          </>
        )}
      </div>
      {/* </Link> */}
    </>
  );
};
// Listitem.propTypes = {
//   index: PropTypes.any.isRequired,
// };
export default Listitem;
