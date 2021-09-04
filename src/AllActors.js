import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";

const AllActors = () => {
    const [actors, setActors] = useState([])
    const params = useParams()
    useEffect(()=> {
        axios(`https://api.themoviedb.org/3/movie/${params.id}/credits?&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => setActors(data.cast))
    })
    return (
        <div>
            {
                actors.map(item => (
                    <img src={`https://www.themoviedb.org/t/p/w66_and_h66_face${item.profile_path}`} alt=""/>
                ))
            }
        </div>
    );
};

export default AllActors;