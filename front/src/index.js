import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { ToastContainer, toast } from "react-toastify";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading="null" persistor={persistor}>
          <App />
          <ToastContainer position="bottom-right" autoClose={3000} />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
