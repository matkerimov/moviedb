import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import Spiner from "../../components/Spiner";
import GoBack from "../../components/GoBack";

const Actor = () => {
    const [actor, setActor] = useState({})
    const [movies, setMovies] = useState([])
    const [actingChronology, setActingChronology] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams();

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/person/${params.id}?&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setActor(data)
                setIsLoading(false)
            })
        axios(`https://api.themoviedb.org/3/person/${params.id}/movie_credits?&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => setMovies(data.cast))

        axios(`https://api.themoviedb.org/3/person/${params.id}/combined_credits?api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setActingChronology(data.cast)
            })

    }, [params.id])

    // Вычисление возраста
    const getAge = (actor) => {
        let today = new Date();
        let birthDate = new Date(actor);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
        {
            age--;
        }
        return age;
    }
    // Функция на правильное подставление 'лет'
    const ageActor = (age) =>{
        if (age >= 10 && age <= 20) {
            return ` ${age} лет`
        } else if (age % 10 === 1) {
            return ` ${age} год`
        } else if (age % 10 >= 2 && age % 10 <= 4) {
            return ` ${age} года`
        }
        return ` ${age} лет`
    }
    // заглушка
let falseImg = 'https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1545&q=80'

    if (isLoading) {
        return <Spiner/>
    }
    return (
        <div>
            <GoBack/>
            <div className="row mt-3 ">
                <div className="col-md-3">
                    <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${actor.profile_path}`} alt=""/>
                    <h2 className="my-4">Personal information</h2>
                    <h5>Fame for</h5>
                    <p className="fs-">{actor.known_for_department}</p>
                    <h5>Gender</h5>
                    <p className="fs-">{actor.gender === 1 ? "woman" : "man"}</p>
                    <h5>Data of birth</h5>
                    <p className="fs-">{actor.birthday} ({ageActor(getAge(actor.birthday))})</p>
                    <h5>Place of birth</h5>
                    <p className="fs-">{actor.place_of_birth}</p>
                    <h5>Also known as</h5>
                    <p className="fs-">{actor.also_known_as.map(item => <div><p>{item}</p></div>)}</p>

                </div>
                <div className="col-md-9 px-5">
                    <h1>{actor.name}</h1>
                    <h4 className="mt-4 ">Biography</h4>
                    {
                        <p className="my-3">{actor.biography.replace(/(.{541})/, "$1<br/>")}</p>

                    }

                    <h5>Also known as</h5>
                    <OwlCarousel className='owl-theme' loop margin={10} nav>
                        {
                            movies.map(item => (
                                <Link to={`/movie/${item.id}`}>
                                    <img style={{width: "130px", height: "190px", objectFit:" cover"}}
                                         src={item.poster_path ? `https://www.themoviedb.org/t/p/w440_and_h660_face/${item.poster_path}` : falseImg }
                                         alt="" className=' img-actors'/>
                                </Link>

                            ))
                        }
                    </OwlCarousel>

                    <h5 className="mt-5">Chronology of films</h5>
                    <div className="mt-3">
                        {
                            actingChronology.filter(item =>
                                item.release_date).sort((a, b) => new Date(b.release_date) - new Date(a.release_date)).map(item => (
                                <Link to={`/movie/${item.id}`}>
                                    <div key={item.id} className="d-flex text-dark">
                                       <p>{item.release_date.slice(0, 4)}</p>
                                       <span className="mx-3"><b>|</b></span>
                                       <p><b>{item.title}</b></p>
                                       <p className="mx-2">| {item.character}</p>
                                </div>
                                </Link>

                            ))
                        }
                    </div>
                </div>

            </div>
        </div>

    );
};

export default Actor;

