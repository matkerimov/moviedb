import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Movies from "./Movies";
import MovieInfo from "./MovieInfo";
import Actors from "./Actors";
import AllActors from "./AllActors";

const App = () => {
    return (
        <div className="container my-5">
            <BrowserRouter>
                <Route exact path="/"><Movies/></Route>
                <Route path="/movie/:id"><MovieInfo /></Route>
                <Route path="/actor/:id"><Actors /></Route>
                <Route path="/allActors/:id"><AllActors /></Route>
            </BrowserRouter>
        </div>

    );
};

export default App;