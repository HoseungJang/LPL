import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";

import { App } from "./App";

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;

    font-size: 20px;

    * {
      transition: all 0.3s;
    }
  }
`;

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById("main")
);
