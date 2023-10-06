import * as React from "react";
import { createRoot } from "react-dom/client";
import TrainDetails from "./components/TrainDetails";
import TrainTable from "./components/TrainTable";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: 
      <TrainTable />,
  },
  {
    path: "/train/:trainId",
    element: <TrainDetails />,
  },
]);

export default router;