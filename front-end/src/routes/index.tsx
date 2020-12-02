import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Playlist } from "../pages/Playlist";
import { Login } from "../pages/Login";

export const Main: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Playlist} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};
