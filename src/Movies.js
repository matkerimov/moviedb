import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const Movies = () => {
    const [page, setPage] = useState(1)
    const [movies, setMovies] = useState([])

    useEffect(() => {
        axios(`http://api.themoviedb.org/3/discover/movie?page=${page}&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => setMovies(data.results))
    }, [page])

    const handlePage = (num) => {
        setPage(num)
    }
    return (
        <div>
            {/*----- first option ------*/}
            {/*{*/}
            {/*    Array(6).fill(0).map((item, index) => (*/}
            {/*        <button key={index}*/}
            {/*                className={`btn btn-primary mx-1 ${page === index + 1 && "btn-info"} `}*/}
            {/*                onClick={() => handlePage(index + 1)}>{index + 1}</button>*/}
            {/*    ))*/}
            {/*}*/}
            {/*----- second option ------*/}
            {
                [...Array(6).keys()].map(item =>
                    <button key={item} type="button"
                            className={`btn btn-primary mx-1 ${page === item + 1 && "btn-info"} `}
                            onClick={() => handlePage(item + 1)}>{item + 1}</button>
                )
            }
            <div className="row my-5">
                {
                    movies.map(item => (
                        <div className="col-md-3 col-sm-4 col-6 mb-3">
                            <div key={item.id}>
                                <Link to={`/movie/${item.id}`}>
                                    <img
                                        src={`https://www.themoviedb.org/t/p/w220_and_h330_bestv2/${item.backdrop_path}`}
                                        alt={item.title} className="w-100"/>
                                    <h5 className="mt-4">{item.original_title}</h5>
                                    <p>{item.release_date}</p>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    );
};


export default Movies;