import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
import NotFound from './components/nonExistingRoutes.tsx';
import EboutMePage from './components/AboutMe.tsx';
import App from './App.tsx';
import { ThemeProvider } from './Context/Themecontext';
import { Provider } from 'react-redux';
import store from './store/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  { path: '/about', element: <EboutMePage /> },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ThemeProvider>
        <Provider store={store}>
          <RouterProvider router={router} />{' '}
        </Provider>
      </ThemeProvider>
    </StrictMode>
  );
} else {
  throw new Error('Root element not found');
}
