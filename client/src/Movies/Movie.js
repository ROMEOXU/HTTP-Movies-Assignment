import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,useHistory} from "react-router-dom";
import MovieCard from "./MovieCard";


function Movie({addToSavedList,movieList,setMovieList}) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const{push}= useHistory();
  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  const updateHandler = ()=>{
    push(`/update-movie/${params.id}`);
  }
  const deleteMovie =(id)=>{
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then((res) =>{
        axios.get('http://localhost:5000/api/movies').then(res=> setMovieList(res.data)).catch(err=>console.log(err))
      
      // console.log('delete',res);
      // const newMovieList = movieList.find(e=>e.id!==id);
      // setMovieList(newMovieList);
      push('/')
        
      } )
      .catch((err) => console.log(err.response));
  }
  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
  
      <div className="save-button" onClick={saveMovie}>  
        Save
      </div>
      <div className="save-button" onClick={updateHandler}>
        Update
      </div>
      <div className="save-button" onClick={()=>deleteMovie(params.id)}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
