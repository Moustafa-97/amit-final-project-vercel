import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Pages/Layout/Layout";
import HomePage from "../Pages/MainPages/ForAll/HomePage";
import Profile from "../Pages/MainPages/ForAll/Profile";
import RawItems from "../Pages/MainPages/ForAdminsAndWorkers/RawItems";
import Orders from "../Pages/MainPages/ForAll/Orders";
import Workers from "../Pages/MainPages/ForAdmins/Workers";
import AddItems from "../Pages/MainPages/ForAdmins/AddItems";
import EditItems from "../Pages/MainPages/ForAdmins/EditItems";
import Manage from "../Pages/MainPages/ForAdmins/Manage";
import AddTables from "../Pages/MainPages/ForAdmins/AddTables";
import EditTables from "../Pages/MainPages/ForAdmins/EditTables";
export default function Admins() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addItem" element={<AddItems />} />
          <Route path="/addTable" element={<AddTables />} />
          <Route path="/editItem:id" element={<EditItems />} />
          <Route path="/editTable:id" element={<EditTables />} />
          <Route path="/manage" element={<Manage />} />
          {/* <Route path="/rawItems" element={<RawItems />} /> */}
          <Route path="/orders" element={<Orders />} />
          {/* <Route path="/workers" element={<Workers />} /> */}
        </Routes>
      </Layout>
    </>
  );
}
