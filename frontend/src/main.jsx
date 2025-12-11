import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './components/App.jsx'
import Home from './components/Home.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import './index.css'
import About from './components/About.jsx'
import Login from './components/Login.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "leaderboard", element: <Leaderboard /> },
      { path: "about", element: <About></About> },
      {path: "login", element: <Login></Login>}
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
