import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import './index.css'
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';

import { Provider } from 'react-redux';
import { store } from './redux/store';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode >
    <Provider store={store}>
    <HelmetProvider>
     <RouterProvider router={router}/>
     </HelmetProvider>
    </Provider>
     
  
  </React.StrictMode>,
)
