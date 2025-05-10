import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './app/store.ts';

import PrivateRoute from './components/content/PrivateRoute.tsx';
import HomePage from './components/content/HomePage.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import AuthPage from './components/content/AuthPage.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element:  <PrivateRoute>
    <HomePage />
  </PrivateRoute>,

  },


  {
    path: '*',
    element: <div>No page found</div>,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
