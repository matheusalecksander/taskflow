import { createBrowserRouter } from 'react-router-dom'
import { Login } from '../pages/login';
import { Tasks } from '../pages/tasks';
import { PrivateRoute } from '../components/PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/tasks',
    element: <PrivateRoute children={<Tasks />} />
  }
]);
