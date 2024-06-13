import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Comp from './components/index.js'
import  './index.css'
import Layout from './Layout.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Comp.Layout />}>
   <Route path='' element={<Comp.Home />} />
   <Route path='login' element={<Comp.Login />} />
   <Route path='signup' element={<Comp.SignUp />} />
  </Route>
))


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>,
)
