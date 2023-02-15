import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import Leader from "layouts/Leader";

// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import Login from "views/auth/Login";
import Accountant from "layouts/Accountant";


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      <Route path="/admin" render={() => {
          return localStorage.getItem("token") ? <Admin/> : <Redirect to="/"/>
        }}/>
      {/* add routes without layouts */}
      <Route path="/leader" render={() => {
          return localStorage.getItem("token") ? <Leader/> : <Redirect to="/"/>
        }}/>
      <Route path="/accountant" render={() => {
          return localStorage.getItem("token") ? <Accountant/> : <Redirect to="/"/>
        }}/>
      {/* <Route path="/profile" exact component={Profile} /> */}
      <Route path="/" exact component={Auth} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
