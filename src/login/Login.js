import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import SignUpForm from "./SignInForm";
import SignInForm from "./SignUpForm";

import "../css/login.css";

function Login() {
  return (
    <>
      <BrowserRouter>
        <div className="Login">
          <div className="appAside" />
          <div className="appForm">
            <div className="pageSwitcher">
              <NavLink
                exact
                to="/sign-in"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#6b5b95" : "#40434e",
                  color: isActive ? "white" : "#9da6b1",
                })}
                className="pageSwitcherItem"
              >
                Sign In
              </NavLink>
              <NavLink
                exact
                to="/sign-up"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#6b5b95" : "#40434e",
                  color: isActive ? "white" : "#9da6b1",
                })}
                className="pageSwitcherItem"
              >
                Sign Up
              </NavLink>
            </div>

            <div className="formTitle">
              <NavLink
                exact
                to="/sign-in"
                style={({ isActive }) => ({
                  color: isActive ? "white" : "#707c8b",
                  borderBottom: isActive ? "1px solid #6b5b95" : "none",
                })}
                className="formTitleLink"
              >
                Sign In
              </NavLink>{" "}
              or{" "}
              <NavLink
                exact
                to="/sign-up"
                style={({ isActive }) => ({
                  color: isActive ? "white" : "#707c8b",
                  borderBottom: isActive ? "1px solid #6b5b95" : "none",
                })}
                className="formTitleLink"
              >
                Sign Up
              </NavLink>
            </div>
            <Routes>
              <Route exact path="/sign-up" element={<SignInForm />} />
              <Route exact path="/sign-in" element={<SignUpForm />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default Login;
