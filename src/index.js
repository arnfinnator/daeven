import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SeaSnake from "./SeaSnake/SeaSnake";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/seasnake",
    element: <SeaSnake></SeaSnake>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Navbar></Navbar>
    <RouterProvider router={router} />
    <Footer></Footer>
  </React.StrictMode>
);
