import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


//tHIS CODE ONLY WRITTEN HERE NOT USED ANYWHERE BY PASSING THESE
//IN LOGIN.JS THIS CODE IS WRITTEN THERE 
export const Loginprocessing   =async (user,dispatch) => {
    const navigate = useNavigate();
    dispatch(loginStart());
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/login`,
        user
        );
        dispatch(loginSuccess(res.data))
      //`${process.env.REACT_APP_API}/api/v1/auth/Register`,
      if (res.data.success) {
        toast("Login successfull");
        toast.success(res.data.message);
        // setIsLoggedIn(true); // Update authentication state
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(loginFailure())
      console.log(error);
      toast.error("Error in handling login form");
    }
}