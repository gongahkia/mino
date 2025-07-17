import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// If using Create React App or Vite (React 18+):
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// (otherwise, for older React <18, use ReactDOM.render(...) as needed)