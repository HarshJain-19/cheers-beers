import React from 'react'
import NavBar from './components/NavBar'
import './styles/App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import BeerCollection from './components/BeerCollection';
import Detail from './components/Detail';
import Error from './components/Error';
import { useState } from 'react';

const App = () => {
  const [id, setId] = useState(1);
  const changeId = x => setId(x);

  const [favourites, setFavourites] = useState([]); 
  const changeFavourites = x => setFavourites(x); 

  return (
    <>
      <Router>
      <NavBar />
        <Routes>
            <Route exact path='/' element= {<BeerCollection changeId={changeId} changeFavourites={changeFavourites} favourites={favourites} fav={false} />}></Route>
            <Route exact path='/favourites' element= {<BeerCollection changeId={changeId} changeFavourites={changeFavourites} favourites={favourites} fav={true} />}></Route>
            <Route exact path="/details" element= {<Detail id={id} />}></Route>
            <Route exact path="/error" element= {<Error />}></Route>

            <Route path="*" element= {<Navigate to="/error" replace={true} />}></Route>
          </Routes>
      </Router>
    </>
  )
}

export default App
