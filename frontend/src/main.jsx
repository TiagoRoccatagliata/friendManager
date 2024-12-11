import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProviderWrapper } from "./components/ThemeProvider.jsx";
import './global.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProviderWrapper>
    <App />
  </ThemeProviderWrapper>,
);