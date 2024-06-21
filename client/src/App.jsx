import "./App.scss";
import Home from "./Pages/Home/Home";
import Watch from "./Pages/Watch/Watch";
import Video from "./Pages/Watch/Watch";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import { Route, Routes, Navigate } from "react-router-dom";
//In oler version Insted of Navigate Redirect is used
function App() {
  const user = false; //if user we can direct go to the home page otherwise go to the signin or register page
  return (
    <>
      <Routes>
        <>
          <Route
            exact
            path="/"
            element={user ? <Home /> : <Navigate to="/register" />}
          />
          <Route
            path="/Register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/Login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          {user && (
            <>
              <Route path="/Video" element={<Video />} />
              <Route path="/movies" element={<Home type="movies" />} />
              <Route path="/series" element={<Home type="series" />} />
              <Route path="/Watch" element={<Watch />} />
            </>
          )}
        </>
      </Routes>
    </>
  );
}

export default App;
