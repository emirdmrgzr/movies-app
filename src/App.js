import { useEffect, useState } from "react";
import axios from "axios"
import Movie from "./components/Movies";

function App() {
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const url =  "https://api.themoviedb.org/3/movie/popular?api_key=3a40174238b84dac85f2c379490ce33c&language=en-US&page=1";

  const getMovie = async()=>{
    await axios
    .get(url)
    .then((response)=>{
      setMovies(response.data.results);
    })
  }
  useEffect(()=>{
      getMovie();
  },[]);

  const handleNameChange = (event) =>{
    setSearchTerm(event.target.value);
  }

  const handleSortChange = (event) =>{
    setSortOrder(event.target.value);
  }

  const sortMovies = (movies,sortOrder) =>{
    const sortedMovies = [...movies];

    if(sortOrder === "asc"){
      sortedMovies.sort((a,b)=> new Date(a.release_date) - new Date(b.release_date));
    }
    else if(sortOrder === "desc"){
      sortedMovies.sort((a,b)=> new Date(b.release_date) - new Date(a.release_date));
    }

    return sortedMovies;
  }

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedMovies = sortMovies(filteredMovies, sortOrder);

  return ( 
    <div className="container">
      <h1>Current Top 20 Movies</h1>
      <div className="search-part">
        <form>
          <input type="text" placeholder="Search by name" onChange={handleNameChange} />
        </form>
      </div>
      <div className="sort-select">
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="asc">Eskiden Yeniye</option>
          <option value="desc">Yeniden Eskiye</option>
        </select>
      </div>
      
      <div className = "movies">
      {sortedMovies.map((movie) =>(
        <Movie key={movie.id} movie={movie}/>
      ))}
      </div>
    </div>
  );
}

export default App;


/*
<div className="container">
      <div className = "movies">
      {data.map((movie) =>(
        <Movie key={movie.id} movie={movie}/>
      ))}
      </div>
    </div>
*/