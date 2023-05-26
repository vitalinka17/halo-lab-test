import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";
import Navigation from "./features/Navigation/Navigation";
import Layout from "./features/Layout/Layout";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Layout>
          <Navigation />
        </Layout>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
