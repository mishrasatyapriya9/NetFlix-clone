import "./newProduct.css";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import storage from "./firebaseConfig.js"
import { app } from "../../firebaseConfig.js";
import toast from "react-hot-toast";
import { useContext } from 'react';
import { MovieContext } from './../../context/movieContext/MovieContext';
import { createMovie } from './../../context/movieContext/apiCalls';
//firebase things
import { 
getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const storage = getStorage(app);

function NewProduct() {
  const navigate = useNavigate();
  const { dispatch } = useContext(MovieContext);
  // const storage = getStorage();
  const [movie,setMovie] = useState(null); // in this putting all inputs same time using name property in the input tag
  //movie is a object ,all values must be present inside it.
  const [img, setImg] = useState(null);
  const [imgTitle,setImgTitle] = useState(null);
  const [imgSm,setImgSm] = useState(null);
  const [Trailer,setTrailer] = useState(null);
  const [Video,setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [uploading, setUploading] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({...movie,[e.target.name]:value})
  }
  // console.log(movie);
  // console.log(img);
  const upload = (items) => {  //here we take all files and then upload in firebase
    items.forEach(item => {
      //if same pic/vid uploaded it takes as one so i did it as a filename
      const filename = new Date().getTime() + item.label + item.file.name;
      const storageRef = ref(storage, `/items/${filename}`); //.put(item) put function didnot works now a days
      const uploadTask = uploadBytesResumable(storageRef, item.file);
      uploadTask.on("state shanges", snapshot => {   //prinitng uploading percentage ,how the file is uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Upload is not paused or runnign ,check what happend in NewProduct.jsx");
            break;
        }
      }, (error) => {
        console.log(error);
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            console.log("User doesn't have permission to access the object")
            break;
          case "storage/canceled":
            console.log("User canceled the upload")
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
          default:
            console.log("error code is " + error);
        }
      }, () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          setMovie(prev => {
            return { ...prev, [item.label]: url };
          });
          // console.log(url);
          setUploaded((prev) => prev + 1);
          // toast.success(`${uploaded} files are uploaded successfully`);
          if (uploaded !== 5) {
            toast.success("Upload is going on please wait some time!!");
          }
          if(uploaded ===5 ){
            toast.success("Upload is successfull,click on create buton");
            setUploading(true);
          }
        });
      }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: imgTitle, label: "imgTitle" },
      { file: imgSm, label: "imgSm" },
      { file: Trailer, label: "Trailer" },
      { file: Video, label: "Video" },
    ])
  }
  console.log(movie);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("in handlesubmit");
    createMovie(movie, dispatch);
    navigate("/movies");
  }
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title Image</label>
          <input
            type="file"
            id="imgTitle"
            name="imgTitle"
            onChange={(e) => setImgTitle(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Tumbneil Image</label>
          <input
            type="file"
            id="imgSm"
            name="imgSm"
            onChange={(e) => setImgSm(e.target.files[0])}
          />
        </div>

        <div className="addProductItem">
          <label>Title</label>
          <input
            className="inputitem"
            type="text"
            placeholder="Spiderman, no way Home"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            className="input"
            type="text"
            placeholder="Description of movie "
            name="des"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Release Year</label>
          <input
            className="input"
            type="text"
            placeholder="2024"
            name="year"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input
            className="input"
            type="text"
            placeholder="Romantic"
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>WatchTime</label>
          <input
            className="input"
            type="text"
            placeholder=""
            name="WatchTime"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Age Limit</label>
          <input
            className="input"
            type="text"
            placeholder="18"
            name="limit"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>isSeries</label>
          <select name="isSeries" id="active" onChange={handleChange}>
            <option value="false">no</option>
            <option value="true">yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input
            type="file"
            id="Trailer"
            name="Trailer"
            onChange={(e) => setTrailer(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input
            type="file"
            id="Video"
            name="Video"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
        {uploaded === 5 ? (
          <button className="addProductButton" onClick={handleSubmit}>
            Create
          </button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>
            upload
          </button>
        )}
      </form>
    </div>
  );
}
export default NewProduct;
