import Navbar from "../../components/Navbar/Navbar.jsx";
import "./Home.scss";
// import AddToPhotos from "@mui/icons-material/AddToPhotos";
import Featured from "../../components/featured/Featured.jsx";
import List from "../../components/List/List.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getrandomLists = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFiYThlZWIzZGM2YjY4OTk3NzdlMzQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MTMwODg4MDUsImV4cCI6MTcxMzY5MzYwNX0.9HNblZnIadDAI3LX_nYXp2fmNtGo3f9pVJAMv90c15k",
            },
          }
        );
        // console.log(res.data.list);
        setLists(res.data.list);
        // setLists(res.data.list);   corrected
      } catch (error) {
        console.log(error);
      }
    };
    getrandomLists();
  }, [type, genre]);
  // const res = await axios.get(`http://localhost:8800/api/lists${type && "?type=" + type}&${genre && "?genre=" + genre}`);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      {Array.isArray(lists) &&
        lists.map((list) => <List list={list} key={list._id} />)}
    </div>
  );
};
//  <List /> Before fetching data from backend these are used
//       <List />
//       <List />
//       <List />
//       <List />
export default Home;
