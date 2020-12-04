import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { themes } from "./themes";

import { Header } from "./components/Layout/Header";
import { Main } from "./components/Layout/Main";
import { Playlist } from "./pages/Playlist";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";

export const App: React.FC = () => {
  const [theme, setTheme] = useState<keyof typeof themes>("light");

  return (
    <ThemeProvider theme={themes[theme]}>
      <BrowserRouter>
        <Header toggleTheme={() => setTheme(theme === "light" ? "dark" : "light")} />
        <Main>
          <Switch>
            <Route exact path="/" component={Playlist} />
            <Route exact path="/login" component={Login} />
            <Route component={NotFound} />
          </Switch>
        </Main>
      </BrowserRouter>
    </ThemeProvider>
  );
};
