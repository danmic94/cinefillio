import React, { useState, useEffect, Fragment, useContext } from "react";
import "../../App.css";
import Movie from "../../components/Movie/Movie";
import NavBar from "../../components/NavBar/NavBar";
import SearchFields from "../../components/SearchFields/SearchFields";
import SearchParamsContext from "../../context/SearchParamsContext";
import noResult from "./no-result.png";
// Since the API does not provide description only on a per movie request so I do not want to make 100 requests
// bulk request option does not exist either sadly :(
export const loremDescription =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry." +
  " More recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

function Home() {
  const [response, setResponse] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const searchParamsContext = useContext(SearchParamsContext);
  const { searchedTitle, searchedYear, searchedType } = searchParamsContext;

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [searchedTitle, searchedYear, searchedType]);

  async function fetchMovies() {
    const api_key = process.env.REACT_APP_OPEN_MOVIE_DB_API_KEY;
    let url = process.env.REACT_APP_OPEN_MOVIE_DB_URL;
    url += `?apikey=${api_key}`;
    url += `&s=${searchedTitle}`;
    url += `&type=${searchedType}`;
    if (searchedYear && searchedYear.length) {
      url += `&y=${searchedYear}`;
    }
    setLoading(true);
    setTimeout(() => {
      console.log("simulate some waiting");
    }, 6000);
    const res = await fetch(url, {
      method: "GET",
    });
    const json = await res.json();
    setLoading(false);
    setResponse(json.Search || []);
  }

  const handleSortByTitle = function (titleAsc) {
    const compareAsc = function (a, b) {
      if (a.Title < b.Title) {
        return -1;
      }
      if (a.Title > b.Title) {
        return 1;
      }
      return 0;
    };

    const compareDesc = function (a, b) {
      if (a.Title > b.Title) {
        return -1;
      }
      if (a.Title < b.Title) {
        return 1;
      }
      return 0;
    };

    let copyResponse = [...response];
    const sortedMoviesByTitle = titleAsc
      ? copyResponse.sort(compareAsc)
      : copyResponse.sort(compareDesc);
    setResponse(sortedMoviesByTitle);
  };

  const handleSortByYear = function (yearAsc) {
    const compareAsc = function (a, b) {
      if (a.Year < b.Year) {
        return -1;
      }
      if (a.Year > b.Year) {
        return 1;
      }
      return 0;
    };

    const compareDesc = function (a, b) {
      if (a.Year > b.Year) {
        return -1;
      }
      if (a.Year < b.Year) {
        return 1;
      }
      return 0;
    };

    let copyResponse = [...response];
    const sortedMoviesByYear = yearAsc
      ? copyResponse.sort(compareAsc)
      : copyResponse.sort(compareDesc);
    setResponse(sortedMoviesByYear);
  };

  const responseIsValid = !isLoading && response && response.length;
  const noResults =
    !isLoading && (typeof response === "undefined" || response.length === 0);

  if (isLoading) {
    return (
      <Fragment>
        <NavBar />
        <div className="app container">
          <SearchFields
            handleTitleSort={handleSortByTitle}
            handleYearSort={handleSortByYear}
          />
          <div className="row movies-wrapper">
            <div className="spinner-border text-primary loader" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  if (noResults) {
    return (
      <Fragment>
        <NavBar />
        <div className="app container">
          <SearchFields
            handleTitleSort={handleSortByTitle}
            handleYearSort={handleSortByYear}
          />
          <div className="row movies-wrapper">
            <img src={noResult}></img>
          </div>
        </div>
      </Fragment>
    );
  }

  if (responseIsValid) {
    return (
      <Fragment>
        <NavBar />
        <div className="app container">
          <SearchFields
            handleTitleSort={handleSortByTitle}
            handleYearSort={handleSortByYear}
          />
          <div className="row movies-wrapper">
            {response.map((movie) => (
              <Movie
                src={movie.Poster}
                description={loremDescription}
                title={movie.Title}
                year={movie.Year}
                key={movie.imdbID}
                movieObj={movie}
              />
            ))}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Home;
