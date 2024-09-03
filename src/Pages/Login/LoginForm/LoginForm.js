import React, { useState } from "react";
import "./LoginForm.css";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useAuth } from '../../../Authentication/AuthContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const LoginForm = () => {
  const [action, setAction] = useState("");
  const [email, setEmail] = useState("string@gmail.com");
  const [password, setPassword] = useState("string");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [summonerName, setSummonerName] = useState("Joohn Senna #EUWn");

  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);

  const [isRegistered, setIsRegistered] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const registerLink = () => {
    setAction(" active");
    setLoginError(null);
    clearInputs();
  };

  const LoginLink = () => {
    setAction("");
    setRegisterError(null);
    clearInputs();
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("LoggedSummonerName", summonerName);
    console.log(summonerName);
    try 
    {
      localStorage.setItem("LoggedSummonerName", summonerName);
      const response = await axios.post('https://localhost:7041/api/Auth/login', { email, password });
      //console.log(typeof response.data)
      login(response.data); // Store user data
      navigate('/');

    } catch (err) {
      setLoginError(err.response.data); // Set login error message
      console.log(err.response.data)
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try 
    {
      const response = await axios.post('https://localhost:7041/api/Auth/register', { username, email, password });
      console.log(response.data);
      clearInputs();
      setIsRegistered(true); // Show success message
      setRegisterError(null); // Clear any previous registration errors
    } catch (err) {

      clearInputs();
      console.log(err.response)
      setRegisterError(err.response.data); // Set registration error message
    }
  };

  const handleGoToLogin = () => {
    // Going back to login page button
    setIsRegistered(false);
    setAction("");
    clearInputs();
  };

  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setUsername("");
  }

  return (
    <div className="container">
      {isRegistered ? (
        <div className="success-container">
          <h1>Registration Successful</h1>
          <p>Your account has been created successfully.</p>
          <button onClick={handleGoToLogin}>Go to Login</button>
        </div>
      ) : (
        
        <div className={`wrapper${action}`}>
          <div className="form-box login">
            <form action="" onSubmit={handleLoginSubmit}>
              <h1>Login</h1>
              {loginError && <p className="login-error">{loginError}</p>} {/* Display login error message */}
              <div className="input-box">
                <input type="email" placeholder="E-Mail" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <FaEnvelope className="icon" />
              </div>
              <div className="input-box">
                <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <FaLock className="icon" />
              </div>
              <div className="input-box" >
                <input type="text" placeholder="Summoner Name... " required value={summonerName} onChange={(e) => setSummonerName(e.target.value)} />
                <FaLock className="icon" />
              </div>

              <button type="submit">Login</button>

              <div className="register-link">
                <p>
                  Don't have an account?{" "}
                  <a href="#" onClick={registerLink}>
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>

          <div className="form-box register">
            <form action="" onSubmit={handleRegisterSubmit}>
              <h1>Registration</h1>
              <div className="input-box">
                <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                <FaUser className="icon" />
              </div>
              <div className="input-box">
                <input type="email" placeholder="E-Mail" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <FaEnvelope className="icon" />
              </div>
              <div className="input-box">
                <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <FaLock className="icon" />
              </div>

              {/* <div className="remember-forgot">
                <label>
                  <input type="checkbox" />I agree to the terms & conditions
                </label>
              </div> */}

              {<p className="register-error">{registerError}</p>} {/* Display registration error message */}

              <button type="submit">Register</button>

              <div className="register-link">
                <p>
                  Already have an account?{" "}
                  <a href="#" onClick={LoginLink}>
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;