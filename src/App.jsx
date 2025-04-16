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
import UserProvider from "./context/userContext";
import {Toaster} from "react-hot-toast";
import Dashboard from './pages/Dashboard/Dashboard';
import Income from "./pages/Income/Income";
import Expense from "./pages/Expense/Expense";

const routes = (
  <UserProvider>
    <div>
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route element={<PrivateRoute/>}>
            <Route path='/note' element={<Home/>} />
            <Route path='/reset-password' element={<ResetPassword/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/income" element={<Income/>}/>
            <Route path="/expense" element={<Expense/>}/>
          </Route>
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/otp-password/:email' element={<OtpPassword/>}/>
          <Route path='*' element={<ErrorNotFound/>}/>
          
        </Routes>
      </Router>
    </div>

    <Toaster
      toastOptions={{
        className:"",
        style:{
          fontSize: "13px"
        }
      }}
    />

  </UserProvider>
)

const App = () => {
  return (
    <div>
      {routes}
    </div>
  )
}

export default App
