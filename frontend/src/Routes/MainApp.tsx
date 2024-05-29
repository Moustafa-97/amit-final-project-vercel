import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../Pages/Layout/Layout";
import axios from "axios";
import { useDispatch } from "react-redux";
import Admins from "./Admins";
import Users from "./Users";
import { userData } from "../Redux/reduxTools/HandleUserLogin";
import HomePage from "../Pages/MainPages/ForAll/HomePage";
import Login from "../Pages/Login-Signup/Login";
import Navbar from "../Pages/MainPages/components/Navbar/Navbar";
import Footer from "../Pages/MainPages/components/Footer/Footer";
import About from "../Pages/MainPages/ForAll/About";
import MenuPage from "../Pages/MainPages/ForAll/MenuPage";
import Signup from "../Pages/Login-Signup/Signup";
import ItemDetail from "../Pages/MainPages/ForAll/ItemDetail";
import SuccessPage from "../Pages/MainPages/components/Success/SuccessPage";
import Profile from "../Pages/MainPages/ForAll/Profile";
import TableBooking from "../Pages/MainPages/components/Table/TableBooking";
import TablePage from "../Pages/MainPages/components/Table/TablePage";
import TableDetails from "../Pages/MainPages/components/Table/TableDetails";
import SuccessTable from "../Pages/MainPages/components/Success/SuccessTable";
import FailPage from "../Pages/MainPages/components/Success/FailPage";
import FailTable from "../Pages/MainPages/components/Success/FailTable";
import EditItems from "../Pages/MainPages/ForAdmins/EditItems";

export default function MainApp() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_SERVER_DOMAIN}/admin/isLogged`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res: object | any | null) => {
        dispatch(userData(res.data));
      })
      .catch((err) => dispatch(userData(err.response.data.state)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_SERVER_DOMAIN}/user/isLogged`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res: object | any | null) => {
        dispatch(userData(res.data));
      })
      .catch((err) => dispatch(userData(err.response.data.state)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BrowserRouter>
        <Layout>
          <nav className="z-50 w-full">
            <Navbar />
          </nav>
          <Routes>
            {/*  */}
            <Route path="/" element={<HomePage />} />
            <Route path="/About" element={<About />} />
            <Route path="/Menu" element={<MenuPage />} />
            <Route path="/Table" element={<TablePage />} />
            <Route path="/Item/:id" element={<ItemDetail />} />
            <Route path="/Table/:id" element={<TableDetails />} />
            <Route path="/editItem/:id" element={<EditItems />} />
            
            <Route path="/undefined/Profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/fail" element={<FailPage />} />
            <Route path="/successTable" element={<SuccessTable />} />
            <Route path="/failTable" element={<FailTable />} />

            {/* waiting */}
            {/* <Route path="/Contact" element={<HomePage />} /> */}
            {/* <Route path="/Pages" element={<HomePage />} /> */}
            {/*  */}

            <Route path="/admin/*" element={<Admins />} />
            <Route path="/user/*" element={<Users />} />
            {/* <Route path="/worker/*" element={<Workers />} /> */}
          </Routes>
          <footer className="m-auto w-full h-fit p-10 bg-[#474747]">
            <div className="flex justify-center items-center flex-col m-auto lg:w-[80%] lg:h-[80%] h-fit">
              <Footer />
            </div>
          </footer>
        </Layout>
      </BrowserRouter>
    </>
  );
}
