import React, { useState, useEffect, Fragment } from "react";
import "../../App.css";
import Movie from "../../components/Movie/Movie";
import NavBar from "../../components/NavBar/NavBar";
import SearchFields from "../../components/SearchFields/SearchFields";

function Home() {
  const [response, setResponse] = useState([]);
  const [searchedTitle, setSearchedTitle] = useState("war");
  const [searchedYear, setSearchedYear] = useState("2021");
  const [searchedType, setSearchedType] = useState("movie");
  // Since the API does not provide description only on a per movie request so I do not want to make 100 requests
  // bulk request option does not exist either sadly :(
  const loremDescription =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry." +
    " More recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

  useEffect(() => {
    fetchMovies();
  }, [searchedTitle, searchedYear, searchedType]);

  async function fetchMovies() {
    const api_key = process.env.REACT_APP_OPEN_MOVIE_DB_API_KEY;
    const url =
      process.env.REACT_APP_OPEN_MOVIE_DB_URL +
      `?apikey=${api_key}` + 
      `&s=${searchedTitle}` + 
      `&t=${searchedType}` + 
      `&y=${searchedYear}`;
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

  var setSearchParams = function (title, year, type) {
    setSearchedTitle(title);
    setSearchedYear(year);
    setSearchedType(type);
  }

  return (
    <Fragment>
      <NavBar />
      <div className="app container">
        <SearchFields handleSearchParams={setSearchParams} />
        <div className="row movies-wrapper">
          {response.map((movie) => {
            return (
              <Movie
                src={movie.Poster}
                description={loremDescription}
                title={movie.Title}
                year={movie.Year}
                key={movie.imdbID}
                handleClickFavourite={(addToFavourites)}
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
