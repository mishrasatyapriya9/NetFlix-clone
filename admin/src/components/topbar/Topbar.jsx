import React, { useContext } from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";
import { logout } from "../../context/authContext/AuthActions";
import toast from "react-hot-toast";
export default function Topbar() {
  const {dispatch } = useContext(AuthContext)
  const Navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  // console.log(user.user);
   const username = user?.user?.username;
  const handleLogout = () => {
    localStorage.removeItem('user');
   // dispatch(logout);
    //toast.success("logout successful");
    Navigate("/Login");
  }
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Welcome { username}</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <div className="text-black mx-2">
            <button onClick={()=>handleLogout()}> Logout</button>
          </div>
          
          {/* here admin profile pic will be shown ,now the default is showing  */}
          <img src=" https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
