import { useEffect, useState } from "react";
import axios from "axios"
import Movie from "./components/Movies";

function App() {
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


  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return ( 
    <div className="container">
      <div className="search-part">
        <form>
          <input type="text" placeholder="Search by name" onChange={handleNameChange} />
        </form>
      </div>
      <div className = "movies">
      {filteredMovies.map((movie) =>(
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