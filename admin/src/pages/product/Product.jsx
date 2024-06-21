import { Link, useLocation ,useNavigate} from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useContext, useState } from "react";
import { app } from "../../firebaseConfig";
import toast from "react-hot-toast";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { updateMovie } from "../../context/movieContext/apiCalls";
const storage = getStorage(app);


export default function Product() {
  const navigate = useNavigate();
  const {dispatch } = useContext(MovieContext);
  const location = useLocation(); //passing the movie data from the productlist to here 
  // console.log(location);
  // console.log(location.state);
  const movie = location.state.movie;
  const [editmovie, setEditmovie] = useState({...movie});
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [Trailer, setTrailer] = useState(null);
  const [Video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const handleText = (e) => {
    e.preventDefault();
    setEditmovie({
      ...editmovie,
      [e.target.name]: e.target.value,
    });
  };

    const upload = (items) => {
      //here we take all files and then upload in firebase
      items.forEach((item) => {
        //if same pic/vid uploaded it takes as one so i did it as a filename
        const filename = new Date().getTime() + item.label + item.file.name;
        const storageRef = ref(storage, `/items/${filename}`); //.put(item) put function didnot works now a days
        const uploadTask = uploadBytesResumable(storageRef, item.file);
        uploadTask.on(
          "state shanges",
          (snapshot) => {
            //prinitng uploading percentage ,how the file is uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                console.log(
                  "Upload is not paused or runnign ,check what happend in NewProduct.jsx"
                );
                break;
            }
          },
          (error) => {
            console.log(error);
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case "storage/unauthorized":
                console.log(
                  "User doesn't have permission to access the object"
                );
                break;
              case "storage/canceled":
                console.log("User canceled the upload");
                break;
              case "storage/unknown":
                // Unknown error occurred, inspect error.serverResponse
                break;
              default:
                console.log("error code is " + error);
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              setEditmovie((prev) => {
                return { ...prev, [item.label]: url };
              });
              // console.log(url);
              setUploaded((prev) => prev + 1);
              // toast.success(`${uploaded} files are uploaded successfully`);
              if (uploaded !== 5) {
                toast.success("Upload is going on please wait some time!!");
              }
              if (uploaded === 5) {
                toast.success("Upload is successfull,click on create buton");
                // setUploading(true);
              }
            });
          }
        );
      });
    };
  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: imgSm, label: "imgSm" },
      { file: imgTitle, label: "imgTitle" },
      { file: Trailer, label: "Trailer" },
      { file: Video, label: "Video" },
      { file: img, label: "img" }
    ]);
  }

  console.log(editmovie);
  const handleSubmit = (e) => {
    e.preventDefault();
    updateMovie(editmovie, dispatch);
    navigate("/movies");
  }

  
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={productData} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie.img} alt="" className="productInfoImg" />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Description:</span>
              <span className="productInfoValue">{movie.des}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Genre:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Year:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Age limit:</span>
              <span className="productInfoValue">{movie.limit}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Series:</span>
              <span className="productInfoValue">{movie.is}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label htmlFor="Product name">Movie Title</label>
            <input
              type="text"
              placeholder={movie.title}
              onChange={handleText}
              name="title"
            />

            <label htmlFor="des">Description</label>
            <input
              type="text"
              placeholder={movie.des}
              onChange={handleText}
              name="des"
            />

            <label htmlFor="Year">Year</label>
            <input
              type="text"
              placeholder={movie.year}
              onChange={handleText}
              name="year"
            />

            <label htmlFor="genre">Genre</label>
            <input
              type="text"
              placeholder={movie.genre}
              onChange={handleText}
              name="genre"
            />

            <label htmlFor="limit">Age limit</label>
            <input
              type="text"
              placeholder={movie.limit}
              onChange={handleText}
              name="limit"
            />

            <label htmlFor="WatchTime">WatchTime</label>
            <input
              type="text"
              placeholder={movie.WatchTime}
              onChange={handleText}
              name="WatchTime"
            />

            <label htmlFor="isSeries">isSeries</label>
            <select
              name="isSeries"
              id=""
              className="selectoption"
              onChange={handleText}
            >
              <option value="false">no</option>
              <option value="true">yes</option>
            </select>

            <label>Tumbneil Image</label>
            <input
              type="file"
              id="imgSm"
              name="imgSm"
              onChange={(e) => setImgSm(e.target.files[0])}
            />

            <label>Title Image</label>
            <input
              type="file"
              id="imgTitle"
              name="imgTitle"
              onChange={(e) => setImgTitle(e.target.files[0])}
            />

            <label>Trailer</label>
            <input
              type="file"
              id="Trailer"
              name="Trailer"
              onChange={(e) => setTrailer(e.target.files[0])}
            />

            <label>Video</label>
            <input
              type="file"
              id="Video"
              name="Video"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={movie.img} alt="" className="productUploadImg" />
              <label htmlFor="file">
                <Publish /> click here
              </label>
              {/* <label>Image</label> */}
              <input
                type="file"
                id="img"
                name="img"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
            {uploaded === 5 ? (
              <button className="addProductButton" onClick={handleSubmit}>
                update
              </button>
            ) : (
              <button className="addProductButton" onClick={handleUpload}>
                upload
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
