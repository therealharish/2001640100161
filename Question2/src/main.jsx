import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createRoot } from "react-dom/client";
import TrainDetails from "./components/TrainDetails";
import TrainTable from "./components/TrainTable";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import TrainInfo from './components/TrainInfo.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: 
      <TrainInfo />,
  },
  {
    path: "/train/:trainId",
    element: <TrainDetails />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
