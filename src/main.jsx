import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../Layout.jsx';
import Home from './pages/home/Home.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import ProtectedRoutes from './componenet/ProtectedRoutes.jsx';
import Login from './pages/login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Profile from './pages/profile/profile.jsx';
import Singleblog from './pages/singleblog/Singleblog.jsx';
import Error from './pages/error/error.jsx';

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <Register />
      },
      {
        path: 'profile',
        element: <ProtectedRoutes component={<Profile />} />
      },
      // {
      //   path: 'dashboard',
      //   element: <Dashboard />
      // },
      {
        path: 'dashboard',
        element: <ProtectedRoutes component={<Dashboard />} />
      },
      {
        path: ':id',
        element: <Singleblog />
      },
      {
        path: "*",
        element: <Error />,
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
)