import React from "react";
import { BrowserRouter as Switch, Redirect, Route } from "react-router-dom";
import Favourites from "./pages/Favourites/Favourites";
import Home from "./pages/Home/Home";
import FavouriteMovieProvider from "./context/FavouriteMoviesProvider";
import SearchParamsProvider from "./context/SearchParamsProvider";

export default function App() {
  return (
    <SearchParamsProvider>
      <FavouriteMovieProvider>
        <Switch>
          <Route path={process.env.PUBLIC_URL + "/favourites"}>
            <Favourites />
          </Route>
          <Route path={process.env.PUBLIC_URL + "/home"}>
            <Home />
          </Route>
          <Route exact path={process.env.PUBLIC_URL + "/"}>
            <Redirect to={process.env.PUBLIC_URL + "/home"} />
          </Route>
        </Switch>
      </FavouriteMovieProvider>
    </SearchParamsProvider>
  );
}
