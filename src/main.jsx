import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import App from './App'
<<<<<<< HEAD
=======
import { SnackbarProvider } from 'notistack'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
>>>>>>> 93d84edb502ac4b78f3639d83bfd3f0f08d1a073
import './index.css'
import GalleryItem from './routes/GalleryItem';
import { SnackbarProvider } from 'notistack';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/:id",
    element: <GalleryItem />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3} >
      <RouterProvider router={router} />
    </SnackbarProvider>
  </React.StrictMode>
)

const router = createBrowserRouter([
  {
    path: "/",
  },
]);
