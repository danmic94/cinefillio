import { Component } from "react";
import FavouriteMovieContext from "./FavouriteMoviesContext";

class FavouriteMovieProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favourites: [],
      favouritesIDs: [],
    };

    this.addMovie = this.addMovie.bind(this);
    this.removeMovie = this.removeMovie.bind(this);
  }

  addMovie(movie) {
    this.setState({
      favourites: [...this.state.favourites, movie],
      favouritesIDs: [...this.state.favouritesIDs, movie.imdbID],
    });
  }

  removeMovie(movie) {
    const imdbID = movie.imdbID;
    const copiedFavourites = [...this.state.favourites];
    let copiedIDs = [...this.state.favouritesIDs];
    const movieIndex = copiedIDs.indexOf(imdbID);
    copiedIDs.splice(movieIndex, 1);
    for (var i = 0; i < copiedFavourites.length; i++) {
      if (copiedFavourites[i].imdbID === imdbID) {
        copiedFavourites.splice(i, 1);
      }
    }
    this.setState({
      favourites: [...copiedFavourites],
      favouritesIDs: [...copiedIDs],
    });
  }

  render() {
    return (
      <FavouriteMovieContext.Provider
        value={{
          favourites: this.state.favourites,
          favouritesIDs: this.state.favouritesIDs,
          addMovie: this.addMovie,
          removeMovie: this.removeMovie,
        }}
      >
        {this.props.children}
      </FavouriteMovieContext.Provider>
    );
  }
}

export default FavouriteMovieProvider;
