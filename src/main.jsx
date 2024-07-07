import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Comp from './components/index.js'
import  './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Comp.Layout />}>
   <Route path='' element={<Comp.Home />} /> 
    
   <Route path='/users/login' element={<Comp.Login />} />
 <Route path='/signup' element={<Comp.SignUp />} />
   <Route path='invoice/:username' element={<Comp.AllInvoice />} />
   <Route path='add/:invoiceCode' element={<Comp.InvoiceForm />} />
   <Route path='edit/:invoiceCode' element={<Comp.Edit />} />
   <Route path='logout' element={<Comp.LogOut />} />
  
  </Route>
))


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
  <RouterProvider router={router} />
  </Provider>
  </React.StrictMode>,
)
