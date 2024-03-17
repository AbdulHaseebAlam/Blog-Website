import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import Navbar from './components/Navbar.jsx';
import Homepage from './components/Homepage.jsx';
import MainContent from './components/MainContent.jsx';
import Footer from './components/Footer.jsx';
import Blogs from './components/Blogs.jsx';
import UserContext from './components/UserContext.jsx';
import Login from './components/LoginSignup/Login.jsx';
import Signup from './components/LoginSignup/Signup.jsx';
import CreatePost from './components/CreatePost/CreatePost.jsx';
import SinglePost from './components/SinglePost/SinglePost.jsx';
import About from './components/About/About.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element:
      <>
        <App />
      </>
  },
  {
    path: "/login",
    element:
      <>
        <Login />
      </>
  },
  {
    path: "/signup",
    element:
      <>
        <Signup />
      </>
  },
  {
    path: "/blogs",
    element:
      <>
        <Navbar />
        <Blogs />
        <Footer />
      </>
  },
  {
    path: "/post/:id",
    element:
      <>
        <Navbar />
        <SinglePost />
        <Footer />
      </>
  },
  {
    path: "/compose",
    element:
      <>
        <Navbar />
        <CreatePost />
        <Footer />
      </>
  },
  {
    path: "/about",
    element:
      <>
        <Navbar />
        <About />
        <Footer />
      </>
  }
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContext>
      <RouterProvider router={router} />
    </UserContext>
  </React.StrictMode>
)
