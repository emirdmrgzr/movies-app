import { useEffect, useState } from "react";

export default function Movie({movie}){
    const [movieName, setMovieName] = useState("");
    const [date, setDate] = useState("");
    const [rate, setRate] = useState("");
    useEffect(()=>{
        setRate(movie.vote_average);
        setDate(movie.release_date);
        setMovieName(movie.original_title);
    },[movie])
   

    return(
        <div className="each-movie">
            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.id}/>
            <div className= "info">
            <p>{movieName}</p>
            <p>{date}</p>
            <p>IMDB Rate: {rate}</p>
            </div>
        </div>
    )
}