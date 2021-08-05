import { useContext } from "react";
import FavouriteMovieContext from "../../context/FavouriteMoviesContext";
import placeholder_hq from "./placeholder_hq.jpg";

function Movie(props) {
  const context = useContext(FavouriteMovieContext);
  const { favourites, favouritesIDs, addMovie, removeMovie } = context;
  const movieIsFavourite = favouritesIDs.includes(props.movieObj.imdbID);

  return (
    <div className="card mb-3 movie-card" style={{ maxWidth: "45.25%" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={props.src.length < 10 ? placeholder_hq : props.src}
            className="img-fluid rounded-start"
            alt="movie-poster"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.description}</p>
            <p className="card-text">
              <small className="text-muted">Year of relase: {props.year}</small>
            </p>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                const { movieObj } = props;
                if (favouritesIDs.includes(movieObj.imdbID)) {
                  removeMovie(movieObj);
                } else {
                  addMovie(movieObj);
                }
              }}
            >
              <i
                className={movieIsFavourite ? "bi bi-star-fill" : "bi bi-star"}
              ></i>
              <span className="favourites-text">Favourite</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;
