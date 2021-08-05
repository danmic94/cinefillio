import React, { useContext } from "react";
import { BrowserRouter as Switch, Redirect, Route } from "react-router-dom";
import Favourites from "./pages/Favourites/Favourites";
import Home from "./pages/Home/Home";
import FavouriteMovieProvider from "./context/FavouriteMoviesProvider";
import FavouriteMovieContext from "./context/FavouriteMoviesContext";

export default function App() {
  return (
    <FavouriteMovieProvider>
      <Switch>
        <Route path="/favourites">
          <Favourites />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </FavouriteMovieProvider>
  );
}
