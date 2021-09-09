import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import Spiner from "../../components/Spiner";

const Movies = () => {
    const [page, setPage] = useState(1)
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/discover/movie?page=${page}&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setMovies(data.results)
                setLoading(false)
            })
    }, [page])

    const handlePage = (num) => {
        setPage(num)
    }
    if (loading){
        return < Spiner />
    }
    return (
        <div >
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
                        <div className="col-md-3 col-sm-6 col col-6 mb-3 ">
                            <div key={item.id} style={{borderRadius: "8px", boxShadow: '0 2px 8px rgb(0 0 0 / 10%)', width: "220px"}}>
                                <Link to={`/movie/${item.id}`}>
                                    <img style={{objectFit:'cover', borderRadius: "15px 15px 0 0"}}
                                         src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
                                         alt={item.title} className="movies-img"/>
                                    <div style={{padding: "26px 10px 12px 10px", width: "100%", height: "119px", backgroundColor: "#fff", borderRadius: "0 0 15px 15px "}}>
                                        <h5 style={{width:'100%', fontSize: "1em", textDecoration: "none"}} className="text-dark mb-1 movies-box"><b>{item.original_title}</b></h5>
                                        <p className="text-dark ">{item.release_date}</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
            {
                [...Array(6).keys()].map(item =>
                    <button key={item} type="button"
                            className={`btn btn-primary mx-1 ${page === item + 1 && "btn-info"} `}
                            onClick={() => handlePage(item + 1)}>{item + 1}</button>
                )
            }
        </div>
    );
};


export default Movies;