import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Comp from './components/index.js'
import  './index.css'
import Layout from './Layout.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Provider } from 'react-redux'
import auth from './store/auth.js'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Comp.Layout />}>
   <Route path='' element={<Comp.Home />} />
   <Route path='login' element={<Comp.Login />} />
   <Route path='signup' element={<Comp.SignUp />} />
   <Route path='invoice' element={<Comp.AllInvoice />} />
  </Route>
))


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={auth}>
  <RouterProvider router={router} />
  </Provider>
  </React.StrictMode>,
)
