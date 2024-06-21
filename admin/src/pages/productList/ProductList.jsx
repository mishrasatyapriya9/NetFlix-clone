//This is the page where all the movies can listed here //to edit anu movie we have to go to product.jsx

import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
// import  productRows  from "../../dummyData";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from './../../context/movieContext/MovieContext';
import { deleteMovies, getMovies } from "../../context/movieContext/apiCalls";
import { useNavigate } from 'react-router-dom';

export default function ProductList() {
  const Navigate = useNavigate();
  // const [data, setData] = useState(productRows);
  const { movies,dispatch} = useContext(MovieContext);
  

  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);
  // console.log(movies);
  
  const handleDelete = async(id) => {
   await deleteMovies(id, dispatch); 
    // setData(data.filter((item) => item.id !== id));
  };
 const passmovie = (id, movie) => {
   Navigate("/product/" + id, { state: { movie: movie } });
 };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "Movie",
      headerName: "Movie",
      width: 250,
      renderCell: (params) => {
        console.log(params.row._id);
        console.log(params.row);
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
            
          </div>
          
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "Year", width: 120 },
    { field: "limit", headerName: "Limit", width: 120 },
    { field: "isSeries", headerName: "isSeries", width: 120 },
    
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
         
        return (
          <>
            {/* <Link to={"/product/" + params.row._id}> */}
            {/* <Link to={{ pathname: "/product/" + params.row._id, movie: params.row }}>  IT IS OLD METHOD ,NOW THESE CODE DONOT WORKS INSTED OF USE NAVIGATE TO PASS THEMOVIE IN STATE TO OTHER COMPONENT */}
            {/* <Link
              Navigate('/product/'+ params.row._id,{state:{movie:params.row}})
            > */}
            <button
              className="productListEdit"
              onClick={() => passmovie(params.row._id, params.row)}
            >
              Edit
            </button>
            {/* </Link> */}

            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={movies}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
        // rowsPerPageOptions={[8, 10, 20]} // Include 8 in the rowsPerPageOptions array
      />
    </div>
  );
}
