import "./Register.scss";
import Img from "../../assets/navbar/netflix-logo.png";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailref = useRef();
  const passwordref = useRef();
  const handlestart = () => {
    setEmail(emailref.current.value);
  };
  const handleFinish = () => {
    setPassword(passwordref.current.value);
    toast.success("Register successfull!");
  };
  return (
    <div className="Register">
      <div className="top">
        <div className="wrapper">
          <img src={Img} alt="" className="logo" />
          <Link to="/Login">
            {" "}
            <button className="loginbutton">Signin</button>
          </Link>
          
        </div>
      </div>
      <div className="conatiner">
        <h1>Unlimited Movies , TV</h1>
        <h2>shows and more</h2>
        <h3>Start at $149,Cancel anytime</h3>
        <p>
          Ready to watch ? Enter your email to create or restart your membership
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailref} />
            <button className="registerButton" onClick={handlestart}>
              Get Started {">"}{" "}
            </button>
          </div>
        ) : (
          <form className="input">
            <input
              type="password"
              placeholder="Enter password"
              ref={passwordref}
            />
            <button className="registerButton" onClick={handleFinish}>
              Start {">"}{" "}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
