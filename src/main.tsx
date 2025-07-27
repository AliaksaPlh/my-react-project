import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
// import App from './App.tsx';
import PokemonContainer from './components/PokemonContainer/PokemonContainer';
import NotFound from './components/nonExistingRoutes.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PokemonContainer />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
} else {
  throw new Error('Root element not found');
}
