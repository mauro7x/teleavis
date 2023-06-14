import { Navigate, createBrowserRouter } from 'react-router-dom';

// Elements
import Home from './Home';
import Form from './Form';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    index: true,
  },
  {
    path: '/create-review',
    element: <Form />,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);
