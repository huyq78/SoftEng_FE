import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/accountant/Dashboard.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import Citizen from "views/leader/Citizen";
import Register from "views/auth/Register";
import UpdateUser from "views/admin/UpdateUser";
import Fee from "views/accountant/Fee";
import Trasaction from "views/accountant/Transaction";
import SidebarAccountant from "components/Sidebar/SidebarAccountant";

export default function Accountant() {
  return (
    <>
      <SidebarAccountant />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/accountant/dashboard" exact component={Dashboard} />
            <Route path="/accountant/fee" exact component={Fee} />
            <Route path="/accountant/transaction" exact component={Trasaction} />
            <Redirect from="/accountant" to="/accountant/dashboard" />
          </Switch>
          {/* <FooterAdmin /> */}
        </div>
      </div>
    </>
  );
}
