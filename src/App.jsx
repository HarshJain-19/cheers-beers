import React from "react";
import NavBar from "./components/NavBar";
import "./styles/App.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import BeerCollection from "./components/BeerCollection";
import Detail from "./components/Detail";
import Error from "./components/Error";
import { useState } from "react";

const App = () => {
    const [id, setId] = useState(
        window.localStorage.getItem("id")
            ? window.localStorage.getItem("id")
            : 1
    );
    const changeId = x => {
        setId(x);
        window.localStorage.setItem("id", x);
    };

    const [searched, setSearched] = useState(
        window.localStorage.getItem("search")
            ? window.localStorage.getItem("search")
            : 'zzz'
    );
    const changeSearched = x => {
        setSearched(x);
        window.localStorage.setItem("search",x);
    }

    return (
        <>
            <Router>
                <NavBar changeSearched={changeSearched} />
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <BeerCollection
                                key={0}
                                changeId={changeId}
                                fav={false}
                                searching={false}
                                searched={searched}
                            />
                        }
                    ></Route>
                    <Route
                        exact
                        path="/favorites"
                        element={
                            <BeerCollection
                                key={1}
                                changeId={changeId}
                                fav={true}
                                searching={false}
                                searched={searched}
                            />
                        }
                    ></Route>
                    <Route
                        exact
                        path="/details"
                        element={<Detail id={id} />}
                    ></Route>
                    <Route
                        exact
                        path="/searched"
                        element={
                            <BeerCollection
                                key={1}
                                changeId={changeId}
                                fav={false}
                                searching={true}
                                searched={searched}
                            />
                        }
                    ></Route>
                    <Route exact path="/error" element={<Error />}></Route>

                    <Route
                        path="/home"
                        element={<Navigate to="/" replace={true} />}
                    ></Route>
                    <Route
                        path="*"
                        element={<Navigate to="/error" replace={true} />}
                    ></Route>
                </Routes>
            </Router>
        </>
    );
};

export default App;
