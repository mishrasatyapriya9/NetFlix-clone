import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
// import Layout from "../../components/Layout/Layout";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      //handle api req
      const res = await axios.post(
        `${import.meta.env.REACT_APP_API}/api/auth/register`,
        {
          name,
          email,
          phone,
          address,
          password,
          //password:hashedpassword,
        }
        //isAdmin=""
      );
      //`${process.env.REACT_APP_API}/api/v1/auth/Register`,
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/Signin");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Something went wrong in handling the submiting the register data"
      );
    }
    };
    // "username":"satya12",
    // "email":"satya12.com",
    // "password":"satya",
    // "isAdmin":"true"  //i think this need to pass in the form because otherwise how to define it is admin or not
  // console.log(process.env.REACT_APP_API);
  return (
    <div>
      <div>
        <section
          className="vh-100 register"
          style={{ backgroundColor: "#eee" }}
        >
          <div className="container-sm h-70">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div className="card text-black" style={{ borderRadius: 15 }}>
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Sign up
                        </p>
                        <form className="mx-1 mx-md-4" onSubmit={handlesubmit}>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw" />
                            <div className="flex-fill mb-0">
                              <input
                                value={name} //binding usestate with our input fields
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                id="form3Example1c"
                                className="form-control form-control-lg"
                                placeholder="Your Name"
                                required
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                            <div className=" flex-fill mb-0">
                              {/* we  delete the form-outline from above clssname otherwise the border is not showing in the form */}
                              <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="form3Example3c"
                                className="form-control"
                                placeholder="Your Email"
                                aria-required
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fa-solid fa-phone fa-lg me-3 fa-fw" />
                            <div className="flex-fill mb-0">
                              <input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                type="tel"
                                id="form3Example1c"
                                className="form-control"
                                placeholder="Phone no"
                                required
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fa-solid fa-location-dot fa-lg me-3 fa-fw" />
                            <div className=" flex-fill mb-0">
                              <input
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                type="text"
                                id="form3Example1c"
                                className="form-control"
                                placeholder="Address"
                                required
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw" />
                            <div className="flex-fill mb-0">
                              <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="form3Example4c"
                                className="form-control"
                                placeholder="Password"
                                required
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-key fa-lg me-3 fa-fw" />
                            <div className=" flex-fill mb-0">
                              {/* we  delete the form-outline from above clssname otherwise the border is not showing in the form */}
                              <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="form3Example4cd"
                                className="form-control"
                                placeholder="Repeat your password"
                                required
                              />
                            </div>
                          </div>
                          <div className="form-check d-flex justify-content-center mb-5">
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              defaultValue
                              id="form2Example3c"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="form2Example3"
                            >
                              I agree all statements in{" "}
                              <a href="#!">Terms of service</a>
                            </label>
                          </div>
                          <div className="d-flex flex flex-col justify-content-center mx-4 mb-3 mb-lg-4">
                            <div>
                              <button
                                // type="button"
                                className="btn btn-primary btn-lg"
                              >
                                Register
                              </button>
                            </div>
                            <div>
                              <Link to="/Login">
                                <button
                                  // type="button"
                                  className="btn btn-primary btn-lg mx-1"
                                >
                                  Login
                                </button>
                              </Link>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                          className="img-fluid"
                          alt="Sample_image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* </div> */}
    </div>
  );
};
export default Register;
