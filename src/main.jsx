import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { SnackbarProvider } from 'notistack'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import GalleryItem from './routes/GalleryItem';

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
);
