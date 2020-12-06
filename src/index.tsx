import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";

import { Header } from "./components/Layout/Header";
import { Main } from "./components/Layout/Main";
import { Playlist } from "./Playlist";

import { PlaylistContextProvider } from "./contexts/Playlist";

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;

    font-size: 20px;
  }
`;

ReactDOM.render(
  <>
    <GlobalStyle />
    <PlaylistContextProvider>
      <Header />
      <Main>
        <Playlist />
      </Main>
    </PlaylistContextProvider>
  </>,
  document.getElementById("main")
);
