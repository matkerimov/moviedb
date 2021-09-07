import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useHistory, useParams} from "react-router-dom";
import OwlCarousel from "react-owl-carousel";

const Actor = () => {
    const [actor, setActor] = useState({})
    const [movies, setMovies] = useState([])
    const [actingChronology, setActingChronology] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/person/${params.id}?&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setActor(data)
                setIsLoading(false)
            })
        axios(`https://api.themoviedb.org/3/person/${params.id}/movie_credits?&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => setMovies(data.cast))

        axios(`https://api.themoviedb.org/3/person/${params.id}/combined_credits?api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setActingChronology(data.cast)
            })

    }, [])

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center my-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
    return (
        <div>
            <button onClick={() => history.goBack()}>Go back</button>

            <div className="row mt-3 ">
                <div className="col-md-3">
                    <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${actor.profile_path}`} alt=""/>
                    <h2 className="my-4">Personal information</h2>
                    <h5>Fame for</h5>
                    <p>{actor.known_for_department}</p>
                    <h5>Gender</h5>
                    <p>{actor.gender === 1 ? "woman" : "man"}</p>
                    <h5>Data of birth</h5>
                    <p>{actor.birthday}</p>
                    <h5>Place of birth</h5>
                    <p>{actor.place_of_birth}</p>
                    <h5>Also known as</h5>
                    <p>{actor.also_known_as.map(item => <div><p>{item}</p></div>)}</p>

                </div>
                <div className="col-md-9">
                    <h1>{actor.name}</h1>
                    <h4 className="mt-4 ">Biography</h4>
                    {
                        <p className="my-3">{actor.biography.replace(/(.{541})/, "$1<br>")}</p>

                    }

                    <h5>Also known as</h5>
                    <OwlCarousel className='owl-theme' loop margin={10} nav>
                        {
                            movies.map(item => (
                                <Link to={`/movie/${item.id}`}>
                                    <img className="mw-100%"
                                         src={`https://www.themoviedb.org/t/p/w130_and_h195_bestv2/${item.poster_path}`}
                                         alt=""/>
                                </Link>

                            ))
                        }
                    </OwlCarousel>

                    <h5 className="mt-5">Chronology of films</h5>
                    <div className="mt-3">
                        {
                            actingChronology.filter(item =>
                                item.release_date).sort((a, b) => new Date(b.release_date) - new Date(a.release_date)).map(item => (
                                <div key={item.id} className="d-flex">
                                    <p>{item.release_date.slice(0, 4)}</p>
                                    <span className="mx-3"><b>|</b></span>
                                    <p><b>{item.title}</b></p>
                                    <p className="mx-2">| {item.character}</p>
                                </div>

                            ))
                        }
                    </div>
                </div>

            </div>
        </div>

    );
};

export default Actor;

