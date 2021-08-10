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
  const searchParamsContext = useContext(SearchParamsContext);
  const {
    searchedTitle,
    searchedYear,
    searchedType,
    setSearchedTitle,
    setSearchedYear,
    setSearchedType,
  } = searchParamsContext;

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
    const res = await fetch(url, {
      method: "GET",
    });
    const json = await res.json();
    setResponse(json.Search || []);
  }

  const setSearchParams = function (title, year, type) {
    setSearchedTitle(title);
    setSearchedYear(year);
    setSearchedType(type);
  };

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

  const responseIsValid =
    typeof response !== "undefined" && response.length > 0;

  return (
    <Fragment>
      <NavBar />
      <div className="app container">
        <SearchFields
          handleSearchParams={setSearchParams}
          handleTitleSort={handleSortByTitle}
          handleYearSort={handleSortByYear}
        />
        <div className="row movies-wrapper">
          {responseIsValid ? (
            response.map((movie) => (
              <Movie
                src={movie.Poster}
                description={loremDescription}
                title={movie.Title}
                year={movie.Year}
                key={movie.imdbID}
                movieObj={movie}
              />
            ))
          ) : (
            <div className="row movies-wrapper">
              <img src={noResult}></img>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
