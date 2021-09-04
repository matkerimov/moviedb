import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";

const Actors = () => {
    const [actor, setActor] = useState({})
    const [movies, setMovies] = useState([])
    const params = useParams();

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/person/${params.id}?&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => setActor(data))
        axios(`https://api.themoviedb.org/3/person/${params.id}/movie_credits?&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => setMovies(data.cast))
    }, [params.id])


    return (
        <div className="row">
            <div className="col-md-3">
                <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${actor.profile_path}`} alt=""/>
            </div>
            <div className="col-md-9">
                <h2>{actor.name}</h2>
                <h4 className="mt-4 ">Biography</h4>
                <h6 className="">{actor.name}</h6>
                <h5 className="my-3">{actor.known_for_department}</h5>
                <p>{actor.biography}</p>

                <h5>Also known as</h5>
                {
                    movies.map(item => (
                        <Link to={`/movie/${item.id}`}>
                            <img src={`https://www.themoviedb.org/t/p/w150_and_h225_bestv2/${item.poster_path}`} alt=""/>
                        </Link>

                    ))
                }
            </div>

        </div>
    );
};

export default Actors;