import React from 'react'
import NavBar from './components/NavBar'
import './styles/App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import BeerCollection from './components/BeerCollection';
import Detail from './components/Detail';
import Error from './components/Error';
import { useState } from 'react';

const App = () => {
  const [id, setId] = useState(window.localStorage.getItem('id') ? window.localStorage.getItem('id') : 1);
  const changeId = x => {
    setId(x);
    window.localStorage.setItem('id',x);
  }

  const [favorites, setFavorites] = useState(window.localStorage.getItem('favList') ? window.localStorage.getItem('favList').split(',') : []); 
  const changeFavourites = x => {
    setFavorites(x); 
    window.localStorage.setItem('favList',x.join(','));
    console.log(x);
  }

  return (
    <>
      <Router>
      <NavBar />
        <Routes>
            <Route exact path='/' element= {<BeerCollection changeId={changeId} changeFavourites={changeFavourites} favorites={favorites} fav={false} />}></Route>
            <Route exact path='/favorites' element= {<BeerCollection changeId={changeId} changeFavourites={changeFavourites} favorites={favorites} fav={true} />}></Route>
            <Route exact path="/details" element= {<Detail id={id} />}></Route>
            <Route exact path="/error" element= {<Error />}></Route>

            <Route path="/home" element= {<Navigate to="/" replace={true} />}></Route>
            <Route path="*" element= {<Navigate to="/error" replace={true} />}></Route>
          </Routes>
      </Router>
    </>
  )
}

export default App
