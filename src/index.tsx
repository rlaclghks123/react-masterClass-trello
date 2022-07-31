import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./theme";
import App from "./App";
import { RecoilRoot } from "recoil";
import { Reset } from "styled-reset";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={darkTheme}>
        <Reset />
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);
