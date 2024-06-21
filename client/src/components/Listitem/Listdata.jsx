import "./Listitem.scss";
import PropTypes from "prop-types"; // Import PropTypes
import {
  Add,
  PlayArrow,
  ThumbDownOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Listdata = ({ item, index }) => {
  const [ishovered, setIshovered] = useState(false);
  const [movie, setMovie] = useState({});
  const Navigate = useNavigate();
  useEffect(() => {

    const fetchmovie = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/movies/find/" + item,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFiYThlZWIzZGM2YjY4OTk3NzdlMzQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MTMwODg4MDUsImV4cCI6MTcxMzY5MzYwNX0.9HNblZnIadDAI3LX_nYXp2fmNtGo3f9pVJAMv90c15k",
          },
        }
      );
      // console.log(res.data.data);
      // console.log(res.data.data);
      setMovie(res.data.data);
    };
    fetchmovie();
  }, [item]);
  const handlewatch = () => {
    Navigate('/Watch',{state:{movie:movie}})
  }

  return (
    <>
      {/* <Link to={{ pathname: "/Watch", state: movie }} className="link"> */}

      <div
        className="listitem"
        style={{ left: ishovered && index * 225 - 40 + index * 5 }}
        onMouseEnter={() => setIshovered(true)}
        onMouseLeave={() => setIshovered(false)}
      > 
        <img src={movie?.img} alt="Movie image" className="w-full h-full object-cover border border-white border-red-100" loading="lazy" />
        {ishovered && (
          <>
            <video
              src={movie?.Video}
              autoPlay={true}
              loop
              onClick={() => handlewatch()}
            />
            <div className="iteminfo">
              <div className="icons">
                <PlayArrow className="icon" onClick={() => handlewatch()} />
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
Listdata.propTypes = {
  item: PropTypes.any.isRequired, // Define PropTypes for 'item'
  index: PropTypes.any.isRequired,
};

export default Listdata;
