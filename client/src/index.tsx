import React from "react";
import ReactDOM from "react-dom/client";

import reportWebVitals from "./reportWebVitals";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "../src/redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "react-confirm-alert/src/react-confirm-alert.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const clientId = process.env.REACT_APP_CLIENT_ID as string;
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={clientId}>
          <App />
        </GoogleOAuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
