import React, { useState, useEffect, useRef } from "react";
import {Link, useNavigate, Route, Routes,useRoutes,Router} from 'react-router-dom'
import axios from 'axios';
import {login} from '../state/reducers/userReducers'
import { useDispatch } from "react-redux";
const Login = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const [successful, setSuccessful] = useState(false);
    let [authMode, setAuthMode] = useState("signin");
  
    const changeAuthMode = () => {
      setAuthMode(authMode === "signin" ? "signup" : "signin")
      setMessage('');
    }
  
     const handleRegister = (e) => {
      e.preventDefault();
      setSuccessful(false);
      axios.post('http://localhost:8000/users',
      {
        username:username,
        email:email,
        password:password
      })
      .then((res)=>{
        console.log(res);
        setSuccessful(true);
        setMessage('Registration successful')
        setAuthMode("signin") // after register show login form
      })
      .catch((err)=>{
        console.log(err.response);
        setSuccessful(false);
        setMessage(err.response.data.message);
      })
    }
  
    const handleLogin = (e) => {
    
      e.preventDefault();
      axios.post('http://localhost:8000/users/login',
      {
        email:email,
        password:password
      })
      .then((res)=>{
        console.log(res);
        // dispatch to userReducers login : state manage
        dispatch(
          login({
            username: username,
            email: email,
            password: password,
            loggedin: true
          })
        )
        setSuccessful(true);
        setMessage('Login successful');
        localStorage.setItem('token', res.data.token)
        navigate("/dashboard");
      
      })
      .catch((err)=>{
        console.log(err.response);
        setSuccessful(false);
        setMessage(err.response.data.message)
        setError(err.response.data.message);
      })
    }
  
    if (authMode === "signin") {
      return (
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={handleLogin}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="text-center">
                Not registered yet?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign Up
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                  required
               
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                  required
                
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <p className="text-center mt-2">
                Forgot <a href="#">password?</a>
              </p>
            </div>
            {message && (
          <div className='form-group msgcontainer' >
            <div className="form-group container">
              <div className={ successful ? "alert alert-success" : "alert alert-danger"  } role="alert">
                  {message}
              </div>
            </div>
          </div>
          )}
          </form>
        </div>
      )
    }
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleRegister}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Already registered?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Full Name</label>
              <input
                type="text"
                name="username"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
                value={username}
                onChange={(e)=>{setUsername(e.target.value)}}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="text"
                name="email"
                className="form-control mt-1"
                placeholder="Email Address"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control mt-1"
                placeholder="Password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                required
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
              {message && (
              <div className='form-group msgcontainer' >
              <div className="form-group container">
                <div className={ successful ? "alert alert-success" : "alert alert-danger"  } role="alert">
                    {message}
                </div>
              </div>
              </div>
            )}
        </form>
      </div>
    );
}

export default Login