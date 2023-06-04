import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, matchPath } from "react-router-dom";
import App from "./App";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SeaSnake from "./SeaSnake/SeaSnake";
import LandingPage from "./views/LandingPage"
import Pokedex from "./Pokedex/index"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/articles",
    element: <App />,
  },
  {
    path: "/seasnake",
    element: <SeaSnake></SeaSnake>,
  },
  {
    path: "/pokedex",
    element: <Pokedex></Pokedex>,
    children: [{
      path: ":id",
      element: <Pokedex></Pokedex>
    }]
  },
]);


// https://mui.com/material-ui/customization/dark-mode/
ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <React.StrictMode>
      <Navbar></Navbar>
      <RouterProvider router={router} />
      {/* <Footer ></Footer> */}
    </React.StrictMode>
  </ThemeProvider>
);
