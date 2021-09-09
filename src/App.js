import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Movies from "./View/Movies";
import MovieInfo from "./View/MovieInfo";
import Actor from "./View/Actor";
import AllActors from "./View/AllActors";
import Header from "./components/Header"
import Footer from "./components/Footer";
import Browse from "./View/Browse";

const App = () => {
    return (

        <BrowserRouter>
            <Header />
            <div style={{backgroundColor: "rgba(228,241,254,0.46)"}}>
                <div className="container py-5">
                    <Route exact path="/"><Movies/></Route>
                    <Route path="/movie/:id"><MovieInfo/></Route>
                    <Route path="/actor/:id"><Actor/></Route>
                    <Route path="/allActors/:id"><AllActors/></Route>
                    <Route path="/browse/:name"><Browse/></Route>
                </div>
            </div>
            <Footer/>

        </BrowserRouter>

    );
};

export default App;