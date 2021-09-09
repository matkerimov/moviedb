import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams, Link} from "react-router-dom";
import GoBack from "../../components/GoBack";
import Spiner from "../../components/Spiner";

const AllActors = () => {
    const [allActors, setAllActors] = useState([])
    const params = useParams()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setAllActors(data.cast)
                setIsLoading(false)
            })
    }, [params.id])

    if (isLoading) {
        return <Spiner/>
    }
    return (
        <div>
            <GoBack/>
            <p className='text-center'>Actors cast:</p>
            <div className='row'>
                {
                    allActors.map(el =>
                        <Link to={`/actor/${el.id}`} key={el.id} className='col-2 text-center'>
                            <img
                                src={el.profile_path ? `https://www.themoviedb.org/t/p/w440_and_h660_face/${el.profile_path}` : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'}
                                alt=""
                                className=' text-center rounded'
                                style={{width: "130px", height: "190px", objectFit:" cover"}}
                            />
                            <h5 className='actors-name text-secondary'>{el.name}</h5>
                        </Link>
                    )
                }
            </div>
        </div>
    );
};

export default AllActors;