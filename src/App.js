import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import ScrollFun from '../public/ScrollFun';

function App() {
const [state ,setState]= useState([])
const [page ,setPage]= useState(0)
const [loading ,setLoding]= useState(false)

useEffect(()=>{
   setLoding(true)
  axios
      .get(
        `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`
      )
      .then(res => {
        setState([...state, ...res.data] );
      
        setLoding(false)
      });

  // .then(res => setState([...state, res.data]))
},[page])
console.log(state);

const scrollEnd =()=>{

  setPage(page + 1)
}


window.onscroll = function(){
  if( window.innerHeight +document.documentElement.scrollTop
      === document.documentElement.offsetHeight)
      {
        scrollEnd()
      }
}

  return (
    <div className="App">
     {  
        state.map((el, i)=>
        <div  key={i} className='container'>
           {  <img src={el.url} height="100px" width="200px" />}
        </div>
        
       )
     }
     {loading && <h1>Loading...</h1>}
    </div>
  );
}

export default App;
