import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Favourites from "./pages/Favourites/Favourites";
import Home from "./pages/Home/Home";

export default function BasicExample() {
  return (
    <Switch>
      <Route path="/favourites">
        <Favourites />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}
