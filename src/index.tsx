import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { setupStore } from "./store/store";
import "./index.css";
import { ModalState } from "./context/ModalContext";
import { BrowserRouter } from "react-router-dom";

const store = setupStore();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalState>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalState>
    </Provider>
  </React.StrictMode>
);
