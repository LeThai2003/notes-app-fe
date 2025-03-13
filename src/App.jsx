import React from 'react'
import "./App.css";
import Home from './pages/Home/Home'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import OtpPassword from './pages/ForgotPassword/OtpPassword';
import ResetPassword from './pages/ForgotPassword/ResetPassword';
import ErrorNotFound from './pages/Error404/ErrorNotFound';

const routes = (
  <Router basename="/">
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route element={<PrivateRoute/>}>
        <Route path='/dashboard' element={<Home/>} />
        <Route path='/reset-password' element={<ResetPassword/>}/>
      </Route>
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/otp-password/:email' element={<OtpPassword/>}/>
      <Route path='*' element={<ErrorNotFound/>}/>
      
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
