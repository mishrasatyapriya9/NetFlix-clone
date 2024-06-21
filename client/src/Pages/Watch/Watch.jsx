import "./Watch.scss";
import { ArrowBackOutlined } from "@mui/icons-material";
// import video from "../../assets/listcard/venomvideo.mp4";
import { Link, useLocation } from "react-router-dom";
const Watch = () => {
  const location = useLocation();
  console.log(location.state.movie._id);
  // const { movie } = location;
  // console.log(movie);
  const video = location.state.movie.Video;
  return (
    <div className="watch">
      <div className="back">
        <Link to="/">
          <ArrowBackOutlined className="arrow" />
          <span>Home</span>
        </Link>
      </div>
      <video src={video} className="video" autoPlay progress controls />
    </div>
  );
};

export default Watch;
