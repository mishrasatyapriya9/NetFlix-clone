import Navbar from "../components/Navbar/Navbar";
import "./Home.scss";
// import AddToPhotos from "@mui/icons-material/AddToPhotos";
import Featured from "../components/featured/Featured.jsx";
import List from "../components/List/List";
const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Featured type="movie" />
      <List />
      <List />
      <List />
      <List />
      <List />
    </div>
  );
};

export default Home;
