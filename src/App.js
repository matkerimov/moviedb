import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Movies from "./Movies";
import MovieInfo from "./MovieInfo";
import Actor from "./Actor";
import AllActors from "./AllActors";
import Header from "./Header"
import Search from "./Search";

const App = () => {
    return (

            <BrowserRouter>
                <Header />
                <div className="container my-5">
                <Route exact path="/"><Movies/></Route>
                <Route path="/movie/:id"><MovieInfo /></Route>
                <Route path="/actor/:id"><Actor /></Route>
                <Route path="/allActors/:id"><AllActors /></Route>
                <Route path="/search/:name"><Search /></Route>
                </div>

            </BrowserRouter>

    );
};

export default App;