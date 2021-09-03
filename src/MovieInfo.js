import {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom'
import axios from "axios";
import {useHistory} from "react-router-dom";

const MovieInfo = () => {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const [actors, setActors] = useState([])
    const history = useHistory();
    const params = useParams();

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${params.id}?api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setMovie(data)
                setIsLoading(false)
            })
    }, [params.id])

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${params.id}/credits?&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => setActors(data.cast))
    }, [params.id])


    if(isLoading){
        return(
            <div className="d-flex justify-content-center my-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
    return (
        <div>
            <button onClick={() => history.goBack()}>Go Back</button>
            <div className="row">
                <div className="col-md-3">
                    <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`} alt={movie.title}/>
                </div>
                <div className="col-md-9">
                    <h2>Название: {movie.title} </h2>
                    <h5>Дата: {movie.release_date}</h5>
                    <h6>{movie.genres.name}</h6>
                    <h6>Описание: {movie.overview}</h6>
                    <h6>Рейтинг: {movie.vote_average}</h6>
                    <p>Бюджет: {movie.budget.toLocaleString()}$</p>
                    <h4>Производители:</h4>
                    {
                        movie.production_companies.map(item =>
                            <div key={item.id}> {item.name}</div>
                        )
                    }
                    <h3>Страны:</h3>
                    {
                        movie.production_countries.map(item =>
                            <div key={item.id}> {item.name}</div>
                        )
                    }
                </div>
                {
                    actors.filter((elem) => elem.popularity > 10).map((item, idx) => (
                        <div key={idx} className="actors">
                            <Link to={`/actor/${item.id}`}>
                                <img src={`https://www.themoviedb.org/t/p/w138_and_h175_face/${item.profile_path}`}
                                     alt=""/>
                                <h5>{item.name}</h5>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>

    );
};

export default MovieInfo;