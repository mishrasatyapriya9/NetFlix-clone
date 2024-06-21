import img from "../../assets/navbar/netflix-logo.png";
import "./Navbar.scss";
import Search from "@mui/icons-material/Search";
import NotificationsActive from "@mui/icons-material/NotificationsActive";
import ArrowDropDownCircle from "@mui/icons-material/ArrowDropDownCircle";
import profile from "../../assets/navbar/SATYA PROFILE PICTURE.png"
import { useState } from "react";
import {Link} from "react-router-dom";
const Navbar = () => {
  const [isscrolled, setIsscrolled] = useState(false);

  window.onscroll = () => {
    setIsscrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  }

  
  return (
    <div className={isscrolled ? "navbar scrolled" : "navbar"}>
      <div className="container ">
        <div className="left">
          <img src={img} alt="" className="logo" />
          {/* <span>Home</span> */}
          <Link to="/" className="link">
            <span>Home</span>
          </Link>
          <Link to="/series" className="link">
            <span>Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span>Movies</span>
          </Link>
          <span>New and popular</span>
          <span>Mylist</span>
        </div>
        <div className="right">
          <Search className="righticons" />
          <span>KID</span>
          <span>
            <NotificationsActive className="righticons" />
          </span>

          <img src={profile} alt="" className="profilepic" />
          <div className="profile">
            <ArrowDropDownCircle className="righticons" />
            <div className="options">
              <span>Setting</span>
              <span>Profile</span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
