import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Contact from "./components/Contact.jsx"
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import About from './components/About.jsx'
import Home from "./components/Home.jsx"
import Services from "./components/Services.jsx"

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children: [
      {path:"/", Component:Home },
      {path:"/contact", Component:Contact},
      {path:"/about", Component:About},
      {path:"/services", Component:Services},
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
