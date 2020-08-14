
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import './updateform.css'
export default function UpdateForm(props) {
const {id} = useParams();
const { push } = useHistory();
    const [item,setItem]= useState({
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [],
  });
  useEffect(()=>{
      axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res=>{console.log('update',res);
    setItem(res.data)})
      .catch(err=>console.log(err))
  },[id])
const changeHandler= e =>{
    setItem({
        ...item,
        [e.target.name]: e.target.value
      });
}
const submitPost = (e) =>{
    e.preventDefault();
    axios
    .put(`http://localhost:5000/api/movies/${id}`,item)
    .then(res=>{
        const newItems = props.movieList.map(newItm => {
            if (newItm.id === item.id) {
              return item;
            }
            return newItm;
          });
       props.setMovieList(newItems);
       push('/');
    })

}
    return (
        <form onSubmit={submitPost}>
        <div className='inputbox'>
       
        <input type='text' name='id' value={item.id} onChange={changeHandler}/>
        <input type='text' name='title' value={item.title} onChange={changeHandler} />
        <input type='text' name='director' value={item.director} onChange={changeHandler}/>
        <input type='text' name='metascore' value={item.metascore} onChange={changeHandler}/>
        <input type='text' name='stars' value={item.stars} onChange={changeHandler}/>
        <button className='btn'>Update</button>
        </div>
        </form>
    )
}
