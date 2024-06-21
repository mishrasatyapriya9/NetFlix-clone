import React from 'react';
import { Toaster } from "react-hot-toast";

import ReactDOM from 'react-dom';
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from './App';
import "resize-observer-polyfill"; //for oldeer browsers compatibikity
import {AuthContextProvider} from "../src/context/authContext/AuthContext"
import { MovieContextProvider } from './context/movieContext/MovieContext';
ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MovieContextProvider>
        <App />
         <Toaster />
      </MovieContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
