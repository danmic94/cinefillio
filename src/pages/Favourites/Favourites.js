import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import Movie from "../../components/Movie/Movie";
import NavBar from "../../components/NavBar/NavBar";
import FavouriteMovieContext from "../../context/FavouriteMoviesContext";
import { loremDescription } from "../Home/Home";

export default function Favourites() {
  const context = useContext(FavouriteMovieContext);
  const { favourites } = context;

  if (favourites.length) {
    return (
      <Fragment>
        <NavBar />
        <div className="app container">
          <div className="row movies-wrapper">
            {favourites.map((movie) => {
              return (
                <Movie
                  src={movie.Poster}
                  description={loremDescription}
                  title={movie.Title}
                  year={movie.Year}
                  key={movie.imdbID}
                  movieObj={movie}
                />
              );
            })}
          </div>
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <NavBar />
        <div className="app container">
          <div className="alert alert-warning text-center" role="alert">
            <h3>No favourite movies selected!</h3>
            <p>Please go back and choose some you like <Link to="/home">here</Link> </p>
          </div>
        </div>
      </Fragment>
    );
  }
}
