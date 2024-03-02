import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { Home } from './pages/Home.jsx';
import { Women } from './pages/Women.jsx';
import { Men } from './pages/Men.jsx';
import { Kids } from './pages/Kid.jsx';
import { ProviderContent } from './Provider/ProviderContent.jsx';
import { BtnGoUp } from './Components/BtnGoUp/BtnGoUp.jsx';
import { ProductDetail } from './pages/ProductDetail.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/women",
    element: <Women />,
  },
  {
    path: "/men",
    element: <Men />,
  },
  {
    path: "/kids",
    element: <Kids />,
  },
  {
    path: "/detail/:id",
    element: <ProductDetail />,
  }
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <ProviderContent>
    <RouterProvider router={router} />
    <BtnGoUp />
  </ProviderContent>
);