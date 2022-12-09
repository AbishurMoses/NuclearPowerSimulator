import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { SnackbarProvider } from 'notistack'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <SnackbarProvider maxSnack={3}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </SnackbarProvider>
)

const router = createBrowserRouter([
  {
    path: "/",
  },
]);


