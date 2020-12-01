import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ReactPlayer from "react-player";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/playlist"
        component={() => <ReactPlayer url={"https://youtu.be/V4p8He3vP40"} />}
      />
    </Switch>
  </BrowserRouter>,
  document.getElementById("main")
);
