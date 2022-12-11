import React from 'react'
import ReactDOM from 'react-dom/client'
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
// } from "react-router-dom";
import App from './App'
import './index.css'
// import GalleryItem from './routes/GalleryItem';
import { SnackbarProvider } from 'notistack';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <SnackbarProvider macSnack={3}><App /></SnackbarProvider>
//   },
//   {
//     path: "/:id",
//     element: <GalleryItem />
//   }
// ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3} >
      {/* <RouterProvider router={router} /> */}
      <App />
    </SnackbarProvider>
  </React.StrictMode>
)
