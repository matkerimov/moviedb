import {useEffect, useState} from 'react';
import {useParams, Link, useHistory} from 'react-router-dom'
import axios from "axios";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Fancy from "../../components/Fancy";
import Spiner from "../../components/Spiner";
import GoBack from "../../components/GoBack";

const MovieInfo = () => {
        const [movie, setMovie] = useState({});
        const [actors, setActors] = useState([])
        const [trailers, setTrailers] = useState([])
        const [isLoading, setIsLoading] = useState(true)
        const [actorsLoading, setActorsLoading] = useState(true)
        const params = useParams();
        const history = useHistory()
        const handleActors = () => {
            history.push(`/allActors/${params.id}`)
        }

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
        }, [params.id])


        if (isLoading || actorsLoading) {
            return <Spiner/>
        }
        return (
            <div>
                <GoBack/>
                <div className="row mt-3">
                    <div className="col-md-3">
                        <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
                             alt={movie.title}/>
                    </div>
                    <div className="col-md-9">
                        <h1>{movie.title}<span className="text-muted">({movie.release_date.slice(0, 4)})</span></h1>
                        <div className="d-flex movie-info">
                            <p className="mr-3">{movie.release_date} | </p>

                            {
                                movie.genres.map(item => (
                                    <div className="box-">
                                        <span className="mx-1">{item.name}</span>
                                    </div>
                                ))
                            }

                            <span className="movie-info-span"> | {Math.floor(movie.runtime / 60)}ч {Math.floor(movie.runtime % 60)}м</span>
                        </div>
                        <h6 className="">Rating: {movie.vote_average * 10}%</h6>
                        <h6 className="my-4">Budget: {movie.budget > 0 ? `$${movie.budget.toLocaleString()}` : '-'}</h6>
                        <h6 className="">Revenue: {movie.revenue > 0 ? `$${movie.revenue.toLocaleString()}` : '-'}</h6>
                        <h5 className="my-4">Review: <p>{movie.overview}</p></h5>
                        <div className="d-flex ">
                            <div className="flex-direction-column" style={{margin: "0 20px 0 0 "}}>
                                <h5>Production Companies:</h5>
                                {
                                    movie.production_companies.map(item =>
                                        <div key={item.id} className="text-center"> {item.name}</div>
                                    )
                                }
                            </div>
                            <div className="flex-direction-column">
                                <h5>Production Countries:</h5>
                                {
                                    movie.production_countries.map(item =>
                                        <div key={item.id} className="text-center"> {item.name}</div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <h4 className="mt-5">Cast</h4>
                    <div className="d-flex justify-content-center mt-1">
                        <OwlCarousel className='owl-theme' loop margin={10} nav items={5}>
                            {
                                actors.filter((elem) => elem.popularity > 5).map((item, idx) => (
                                    <div key={idx}>
                                        <Link to={`/actor/${item.id}`}>
                                   <span className="cart-of-actor col-sm-6">
                                       <img
                                            src={item.profile_path ? `https://image.tmdb.org/t/p/w200${item.profile_path}` : 'https://icon-library.com/images/unknown-person-icon/unknown-person-icon-9.jpg'}
                                            alt=""/>
                                       <h6 className="text-center m-info-text">{item.name}</h6>
                                   </span>
                                        </Link>

                                    </div>
                                ))
                            }
                            <button
                                className='btn btn-more d-flex align-items-center justify-content-center text-center text-dark'
                                onClick={handleActors}><h1>more -></h1>
                            </button>

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