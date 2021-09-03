import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";

const Actors = () => {
    const [actor, setActor] = useState({})
    const params = useParams();
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/person/${params.id}?&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => setActor(data))
    }, [params.id])

    return (
        <div>
            <img src={`https://www.themoviedb.org/t/p/w138_and_h175_face/${actor.profile_path}`} alt=""/>
            <h3>{actor.name}</h3>
        </div>
    );
};

export default Actors;