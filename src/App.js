import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Movies from "./Movies";
import MovieInfo from "./MovieInfo";
const App = () => {
    return (
        <div className="container my-5">
            <BrowserRouter>
                <Route exact path="/"><Movies/></Route>
                <Route path="/movie/:id"><MovieInfo /></Route>
                <Route path="/actors/:id"><MovieInfo /></Route>
            </BrowserRouter>
        </div>

    );
};

export default App;