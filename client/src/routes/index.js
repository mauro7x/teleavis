import { Navigate, createBrowserRouter } from 'react-router-dom';

// Elements
import Home from './Home';
import Foo from './Foo';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    index: true,
  },
  {
    path: '/foo',
    element: <Foo />,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);
