import React from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SnackbarProvider } from "./provider/SnackbarContext";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import PetsTable from "./pages/PetsTable";
import Details from "./pages/Details";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/pets-table",
    element: <PetsTable />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/details/:id/:name/:category/:status",
    element: <Details />,
    errorElement: <NotFoundPage />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackbarProvider>
      <RouterProvider router={router} />
    </SnackbarProvider>
  </React.StrictMode>
);

reportWebVitals();
