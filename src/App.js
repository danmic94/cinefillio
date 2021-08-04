import { useState, useEffect } from "react";
import "./App.css";
import "./components/Movie/Movie";
import Movie from "./components/Movie/Movie";

function App() {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  async function fetchMovies() {
    const api_key = process.env.REACT_APP_OPEN_MOVIE_DB_API_KEY;
    const url =
      process.env.REACT_APP_OPEN_MOVIE_DB_URL +
      `?apikey=${api_key}&s=fire&t=movie&y=2012&plot=short`;
    const res = await fetch(url, {
      method: "GET",
    });
    const json = await res.json();
    console.log(json.Search);
    setResponse(json.Search);
  }

  return (
    <div className="App container">
      <div className="row movies-wrapper">
        {response.map((movie) => {
          return (
            <Movie
              src={movie.Poster}
              description="Small description lorem here. This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
              year={movie.Year}
              key={movie.imdbID}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
