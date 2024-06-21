import "./List.scss";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Listitem from "../Listitem/Listitem.jsx";
import { useRef, useState } from "react";
import Listdata from "../Listitem/Listdata.jsx";

const List = ({ list }) => {
  const [sliderno, setSliderno] = useState(0);
  const [ismoved, setIsmoved] = useState();
  // const [data, setdata] = useState([]);
  // setdata(list.content);
  // console.log(list.content);

  //using useref hook to call the container
  const listRef = useRef();
  const handleClick = (direction) => () => {
    setIsmoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 10;
    //In React, the getBoundingClientRect() method is used to retrieve information about the size and position of a DOM element within the webpage.
    if (direction === "left" && sliderno > 0) {
      setSliderno(sliderno - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    } else if (direction === "right" && sliderno < 5) {
      setSliderno(sliderno + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
    // console.log(list?.title);
  };
  // console.log(list.content);
  return (
    <div className="List">
      
      <div className="ListTitle">{list.title}</div>
      <div className="wrapper">
        <ArrowBackIos
          className="sliderarrow left"
          onClick={handleClick("left")}
          style={{ display: !ismoved && "none" }}
        />
        <div className="container" ref={listRef}>
          {/* {Array.isArray(list) &&
            list.content.map((item, i) => <Listitem item={item} index={i} />)} */}
          {list.content.map((item, i) => (
            <Listdata item={item} index={i} />
          ))}
        </div>
        <ArrowForwardIos
          className="sliderarrow right"
          onClick={handleClick("right")}
        />
      </div>
    </div>
  );
};
export default List;
