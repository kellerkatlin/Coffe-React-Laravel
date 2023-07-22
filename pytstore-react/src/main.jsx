import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { TiendaProvider } from "./context/TiendaProvider";
import router from "./router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TiendaProvider>
      <RouterProvider router={router} />
    </TiendaProvider>
  </React.StrictMode>
);
