import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import SidebarLeader from "components/Sidebar/SidebarLeader.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/leader/Dashboard.js";
import Citizen from "views/leader/Citizen";
// import Register from "views/auth/Register";
import Absence from "views/leader/Absence";
import Household from "views/leader/Household";
import CreateCitizen from "views/leader/CreateCitizen";
import Stay from "views/leader/Stay";
import Death from "views/leader/Death";
import CitizenProfile from "views/leader/CitizenProfile";

export default function Leader() {
  return (
    <>
      <SidebarLeader />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/leader/dashboard" exact component={Dashboard} />
            <Route path="/leader/absence" exact component={Absence} />
            <Route path="/leader/create-citizen" exact component={CreateCitizen} />
            <Route path="/leader/house-hold" exact component={Household} />
            <Route path="/leader/citizen" exact component={Citizen} />
            <Route path="/leader/stay" exact component={Stay} />
            <Route path="/leader/death" exact component={Death} />
            <Route path="/leader/citizen/profile" exact component={CitizenProfile} />
            {/* <Route path="/leader/register" exact component={Register} /> */}
            <Redirect from="/leader" to="/leader/dashboard" />
          </Switch>
          {/* <FooterAdmin /> */}
        </div>
      </div>
    </>
  );
}
