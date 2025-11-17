import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router";
import DefaultLayout from './layouts/DefaultLayout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
     Component: DefaultLayout,
    //  errorElement: <ErrorPage/>,
     children: [
       { index: true, Component: Home },
       { path: 'profile', Component: Profile },
       { path: 'login', Component: Login },
       { path: 'signup', Component: Signup }
     ]
  },
]);

function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );

  return (<RouterProvider router={router} />)
}

export default App;
