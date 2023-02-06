import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ErrorPage from './routes/ErrorPage'
import Root from './routes/Root'
import Homepage from './routes/HomePage'
import Notes from './routes/Notes'
import Login from './routes/Login'
import SignUp from './routes/SignUp';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from  'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Homepage />
      },
      {
        path: "/notes",
        element: <Notes />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      
    ]
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
 <RouterProvider router={router}></RouterProvider>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
