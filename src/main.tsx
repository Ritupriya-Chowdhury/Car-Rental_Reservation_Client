import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import './index.css'
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode >
    <Provider store={store}>
    <HelmetProvider>
    <PersistGate loading={null} persistor={persistor}>
     <RouterProvider router={router}/>
     </PersistGate>
     </HelmetProvider>
    </Provider>
     
  
  </React.StrictMode>,
)
