import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";

import { App } from "./App";

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
      <App />
    </PlaylistContextProvider>
  </>,
  document.getElementById("main")
);
