import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Header } from "./components/Layout/Header";
import { Main } from "./components/Layout/Main";
import { Playlist } from "./pages/Playlist";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Main>
        <Switch>
          <Route exact path="/" component={Playlist} />
          <Route exact path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Main>
    </BrowserRouter>
  );
};
