import Sidebar from "./components/sidebar/Sidebar";
import "resize-observer-polyfill"; //for older browsers compatibility
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Route ,Navigate } from "react-router-dom";
import { Routes } from "react-router-dom";

import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register.js";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext.js";


function App() {
  // const user = JSON.parse(localStorage.getItem('user'));
  const { user } = useContext(AuthContext);
  return (
    <Router>
      {<Topbar />}
      <div className="container">
        {user && <Sidebar />}
        {}
        <Routes>
          <Route
            exact
            path="/"
            element={user ? <Home /> : <Navigate to="/Register" />}
          />
          <Route
            exact
            path="/Register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
          <Route
            exact
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          {user && (
            <>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/users" element={<UserList />} />
              <Route exact path="/user/:userId" element={<User />} />
              <Route exact path="/newUser" element={<NewUser />} />
              <Route exact path="/movies" element={<ProductList />} />
              <Route exact path="/product/:productId" element={<Product />} />
              <Route exact path="/newproduct" element={<NewProduct />} />
            </>
          )}

          {/* <Route exact path="/">
            <Home />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Register">
            <Register />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/movies">
            <ProductList />
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route>
          <Route path="/newproduct">
            <NewProduct />
          </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
