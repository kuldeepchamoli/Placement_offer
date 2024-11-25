import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Alert } from 'react-bootstrap';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setResponseMessage("Please fill in both fields");
      return;
    }

    setIsLoading(true);
    setResponseMessage("");

    const sendInfo = {
      username,
      password,
    };

    axios
      .post("http://localhost:8080/login", sendInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if(response.status===401){

        }
        setIsLoading(false);
        localStorage.setItem("token", response.data);
        setResponseMessage(<Alert variant="success">Login successful!</Alert>);
        navigate("/placement");
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Login error:", error);
        setResponseMessage(<Alert variant="danger">Login failed. Please try again.</Alert>);
      });
  };

  return (
    <>
    <Navbar class="nav" bg="dark" data-bs-theme="dark">
  <Navbar.Text style={{ color: 'black', fontSize: '16px', fontWeight: 'bold' ,align:'center'}}>
    <h2>Placement Offer Portal</h2>
  </Navbar.Text>
</Navbar> 
    <container>
      
    <div className="container mt-5">
      <h1 className="text-center mb-4">Outreach Department Login</h1>

      {responseMessage && (
        <div className={`alert ${responseMessage.includes("successful") ? "alert-success" : "alert-danger"}`}>
          {responseMessage}
        </div>
      )}


      <form onSubmit={handleSubmit}>
      <div className="row mb-3">  {/* Adds bottom margin for spacing */}
  <label className="col-sm-2 col-form-label" htmlFor="username">
    Username:
  </label>
  <div className="col-sm-10">
    <input
      type="text"
      id="username"
      className="form-control"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      style={{ width: "490px" }}

    />
  </div>
      </div>
      <br/><br/>
      <div className="row mb-3">  {/* Adds bottom margin for spacing */}
  <label className="col-sm-2 col-form-label" htmlFor="password">
    Password:
  </label>
  <div className="col-sm-10">
    <input
      type="password"
      id="username"
      className="form-control"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      style={{ width: "490px" }}

    />
  </div>
      </div>
      <br/><br/>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
            </button>
        </div>
      </form>
      
    </div>
    </container>
    </>
  );
}
