import {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom'
import axios from "axios";
import {useHistory} from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Fancy from "./Fancy";

const MovieInfo = () => {
    const [movie, setMovie] = useState({});
    const [actors, setActors] = useState([])
    const [trailers, setTrailers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [actorsLoading, setActorsLoading] = useState(true)
    const history = useHistory();
    const params = useParams();

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${params.id}?api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setMovie(data)
                setIsLoading(false)
            })

        axios(`https://api.themoviedb.org/3/movie/${params.id}/credits?&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setActors(data.cast)
                setActorsLoading(false)
            })

        axios(`https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setTrailers(data.results)
            })
    }, [])


    if (isLoading || actorsLoading) {
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
                <button onClick={() => history.goBack()}>Go Back</button>
                <div className="row mt-3">
                    <div className="col-md-3">
                        <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
                             alt={movie.title}/>
                    </div>
                    <div className="col-md-9">
                        <h2>Название: {movie.title} </h2>
                        <h5>Дата: {movie.release_date}</h5>
                        {/*<h6>{movie.genres.name}</h6>*/}
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
                    <h4 className="mt-5">Cast</h4>
                    <div className="d-flex justify-content-center mt-1">
                        <OwlCarousel className='owl-theme' loop margin={10} nav>
                            {
                                actors.filter((elem) => elem.popularity > 5).map((item, idx) => (
                                    <div key={idx}>
                                        <Link to={`/actor/${item.id}`}>
                                   <span className="cart-of-actor">
                                       <img
                                           src={item.profile_path ? `https://image.tmdb.org/t/p/w200${item.profile_path}` : 'https://icon-library.com/images/unknown-person-icon/unknown-person-icon-9.jpg'}
                                           alt=""/>
                                       <h6 className="text-center">{item.name}</h6>
                                   </span>
                                        </Link>
                                        {/*<Link to={`/allActors/${actors.id}`}>*/}
                                        {/*    <h4>Read more-></h4>*/}
                                        {/*</Link>*/}
                                    </div>
                                ))
                            }
                        </OwlCarousel>
                    </div>
                </div>
                {
                    trailers.map(item =>
                        <Fancy key={item.key} id={item.key}/>
                    )
                }
            </div>
        );
    }
    ;

export default MovieInfo;