import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams, Link} from "react-router-dom";
import Spiner from "../../components/Spiner";


const Browse = () => {
    const [films, setFilms] = useState({})
    const [page, setPage] = useState(1)
    const params = useParams()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/search/movie?query=${params.name}&page=${page}&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setFilms(data)
                setIsLoading(false)
            })

    }, [page, params.name])

    let pageButtons = ""
    if (films.total_pages > 1 && page === 1) {
        pageButtons = (
            <button className="btn btn-outline-info border border-info border-3" type="button" onClick={() => setPage(page + 1)} style={{border: "none"}}>
                <i className="fas fa-arrow-circle-right" style={{width: "50px"}}></i>
            </button>)
    } else if (films.total_pages > page && page > 1) {
        pageButtons = (<>
            <div className='buttons-group'>
                <button className="btn btn-outline-info border border-info border-3" style={{marginRight: "5px"}} type="button"  onClick={() => setPage(page - 1)}>
                    <i className="fas fa-arrow-circle-left" style={{width: "50px"}}></i>
                </button>
                <button className="btn btn-outline-info border border-info border-3" type="button"  onClick={() => setPage(page + 1)}>
                    <i className="fas fa-arrow-circle-right" style={{width: "50px"}}></i>
                </button>
            </div>
        </>)
    } else if (films.total_pages === page) {
        pageButtons = (<button className="btn btn-outline-info border border-info border-3" type="button" onClick={() => setPage(page - 1)}>
            <i className="fas fa-arrow-circle-left" style={{width: "50px"}}></i>
        </button>)
    }

    if (isLoading) {
        return <Spiner/>
    }
    return (
        <div>
            <div className="row">
                {
                    films?.results?.length ? films?.results?.map(movie =>

                        <div key={movie.id} className='col-md-3'>
                            <Link to={`/movie/${movie.id}`}>
                                <img className='search-img me-5 my-3'
                                     src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://i.pinimg.com/280x280_RS/ed/03/06/ed0306b0f54a221a1a4d17823d354a18.jpg'}
                                     alt=""/>
                                <h4>{movie.title}</h4>
                            </Link>
                        </div>
                    ) : <h2>Мындай фильм жок!</h2>
                }
            </div>
            {pageButtons}
        </div>
    );
};

export default Browse;