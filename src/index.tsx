import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import "./index.css";
import { Ranking, Game, Landing } from "./routes";
import { LoginForm } from "./features/user/LoginForm";
import { store } from "./app/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/game" element={<Game />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="*" element={<Landing />} />
        </Routes>
        <LoginForm />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
