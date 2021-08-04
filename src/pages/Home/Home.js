import React, { useState, useEffect, Fragment } from "react";
import "../../App.css";
import Movie from "../../components/Movie/Movie";
import NavBar from "../../components/NavBar/NavBar";

function Home() {
  const [response, setResponse] = useState([]);
  const loremDescription =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry." +
    " More recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

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

  function addToFavourites(movieObject) {
    console.log(movieObject);
  }

  return (
    <Fragment>
      <NavBar />
      <div className="app container">
        <div className="row movies-wrapper">
          {response.map((movie) => {
            return (
              <Movie
                src={movie.Poster}
                description={loremDescription}
                year={movie.Year}
                key={movie.imdbID}
                handleClickFavourite={addToFavourites}
                movieObj={movie}
              />
            );
          })}
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
