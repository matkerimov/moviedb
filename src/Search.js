import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";

const Search = () => {
    const [page, setPage] = useState(1)
    const [films, setFilms] = useState({})
    const params = useParams()
    useEffect(()=>{
        axios(`https://api.themoviedb.org/3/search/movie?api_key=6f19f87e3380315b9573c4270bfc863c&query=${params.name}&page=${page}`)
            .then(({data})=> setFilms(data))
    }, [page, name])
    return (
        <div>
            
        </div>
    );
};

export default Search;