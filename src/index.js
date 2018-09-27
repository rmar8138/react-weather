import React from "react";
import ReactDOM from "react-dom";
import { injectGlobal } from "styled-components";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

injectGlobal`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
  }

  body {
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    font-size: 62.5%;
    line-height: 1.6;
    color: white;
  }

  h1, h2, h3 {
    font-weight: 300;
  }
`;

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
