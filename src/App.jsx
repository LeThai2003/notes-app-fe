import React from 'react'
import "./App.css";
import Home from './pages/Home/Home'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const routes = (
  <Router basename="/">
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route element={<PrivateRoute/>}>
        <Route path='/dashboard' element={<Home/>} />
      </Route>
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<SignUp/>} />
    </Routes>
  </Router>
)

const App = () => {
  return (
    <div>
      {routes}
    </div>
  )
}

export default App
