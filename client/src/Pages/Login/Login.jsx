import "./Login.scss";
import Img from "../../assets/navbar/netflix-logo.png";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const Login = () => {

  return (
    <div className="Login">
      <div className="top">
        <div className="wrapper">
          <img src={Img} alt="" className="logo" />
        </div>
      </div>
      <div className="conatiner">
        <form action="">
          <h1>Sign in</h1>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>

          <span>
            New to Netflix ?{" "}
            <b>
              <Link to="/Register">
                <button>Sign up</button>{" "}
              </Link>
            </b>
          </span>
          <span>
            New to Netflix ?{" "}
            <b>
              <Link to="/Register">
                <button>Admi</button>{" "}
              </Link>
            </b>
          </span>
          <span className="small">
            This is protected by Google reCAPTCHA to ensure you are not a{" "}
            <bot className="b">Learn more</bot>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
