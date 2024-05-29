import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import WhiteBtnMenu from "../../buttons/WhiteBtnMenu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userData } from "../../../../../Redux/reduxTools/HandleUserLogin";
const logo = require("./img/Logo.png");

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userState = useSelector((state: object | any) => state.Login.user);

  const sections =
    userState?.user?.account === "user"
      ? ["Home", "About", "Menu", "Cart", "Orders", "Tables", "Profile"]
      : userState?.user?.account === "admin"
      ? ["Home", "About", "Menu", "Manage", "Profile"]
      : ["Home", "About", "Menu", "Profile"];

  const handleBook = (e: any) => {
    userState.state
      ? axios
          .post(
            `${process.env.REACT_APP_SERVER_DOMAIN}/${userState?.user?.account}/logout`
          )
          .then((res) => dispatch(userData(res.data)))
          .catch((err) => console.log(err.response.data))
      : navigate("/login");
  };
  return (
    <>
      {open && (
        <div
          className="absolute w-screen h-screen z-40 bg-transparent  m-auto top-[0%] left-[0%]"
          onClick={() => setOpen(!open)}
        ></div>
      )}
      <div className="w-full h-[55px] py-8 lg:flex hidden items-center justify-center lg:gap-[251px] bg-white">
        <div className="w-1/3 flex items-center justify-center">
          <Link to="/" className=" lg:w-full lg:h-full ms-5">
            <img src={logo} alt="logo" className="h-full w-full"/>
          </Link>
        </div>
        <div className="w-1/3">
          <ul className=" list-none flex items-center justify-center lg:w-[120%] lg:h-[32px] w-full h-full lg:gap-[8px] rounded-[34px]">
            {sections &&
              sections.map((section) => (
                <Link
                  key={Math.random()}
                  to={
                    section === "Home"
                      ? "/"
                      : section === "Cart"
                      ? "/user/Cart"
                      : section === "Orders"
                      ? `/${userState?.user?.account}/${section}`
                      : section === "Manage"
                      ? `/${userState?.user?.account}/${section}`
                      : section === "Tables"
                      ? `/${userState?.user?.account}/${section}`
                      : section === "Raw Items"
                      ? `/${userState?.user?.account}/rawItems`
                      : section === "Profile"
                      ? `/${userState?.user?.account}/${section}`
                      : `${section}`
                  }
                >
                  <li
                    className={
                      section === "Home"
                        ? location.pathname === "/"
                          ? ` bg-[#DBDFD0] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                          : ` hover:bg-[#dbdfd04e] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                        : section === "Cart"
                        ? location.pathname ===
                          `/${userState?.user?.account}/${section}`
                          ? ` bg-[#DBDFD0] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                          : ` hover:bg-[#dbdfd04e] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                        : section === "Orders"
                        ? location.pathname ===
                          `/${userState?.user?.account}/${section}`
                          ? ` bg-[#DBDFD0] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                          : ` hover:bg-[#dbdfd04e] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                        : section === "Tables"
                        ? location.pathname ===
                          `/${userState?.user?.account}/${section}`
                          ? ` bg-[#DBDFD0] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                          : ` hover:bg-[#dbdfd04e] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                        : section === "Raw Items"
                        ? location.pathname ===
                          `/${userState?.user?.account}/rawItems`
                          ? ` bg-[#DBDFD0] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                          : ` hover:bg-[#dbdfd04e] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                        : section === "Manage"
                        ? location.pathname ===
                          `/${userState?.user?.account}/${section}`
                          ? ` bg-[#DBDFD0] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                          : ` hover:bg-[#dbdfd04e] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                        : section === "Profile"
                        ? location.pathname ===
                          `/${userState?.user?.account}/Profile`
                          ? ` bg-[#DBDFD0] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                          : ` hover:bg-[#dbdfd04e] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                        : location.pathname === `/${section}`
                        ? ` bg-[#DBDFD0] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                        : ` hover:bg-[#dbdfd04e] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                    }
                    onClick={(e: any) => {}}
                  >
                    {section}
                  </li>
                </Link>
              ))}
          </ul>
        </div>
        <div onClick={handleBook} className="w-1/3">
          <WhiteBtnMenu
            name="book a table"
            class="hover:bg-[#DBDFD04e]"
            state={userState.state}
          />
        </div>
      </div>
      <div className="relative w-full lg:h-[55px] h-fit py-8 px-2 flex lg:hidden items-center justify-between bg-white">
        <div
          className="relative z-50 w-1/4 h-full text-center m-auto "
          onClick={() => setOpen(!open)}
        >
          =
        </div>
        {open && (
          <>
            <div className=" absolute top-[50%] left-[15%] bg-white z-50">
              <ul className=" relative z-50 list-none flex items-center justify-center flex-col lg:w-[433px] lg:h-[32px] w-full h-full lg:gap-[8px] rounded-[34px]">
                {sections &&
                  sections.map((section) => (
                    <Link
                      onClick={() => setOpen(!open)}
                      to={
                        section === "Home"
                          ? "/"
                          : section === "Cart"
                          ? "/user/Cart"
                          : section === "Orders"
                          ? `/${userState?.user?.account}/${section}`
                          : section === "Tables"
                          ? `/${userState?.user?.account}/${section}`
                          : section === "Raw Items"
                          ? `/${userState?.user?.account}/rawItems`
                          : section === "Profile"
                          ? `/${userState?.user?.account}/${section}`
                          : `${section}`
                      }
                    >
                      <li
                        className={
                          section === "Home"
                            ? location.pathname === "/"
                              ? ` bg-[#DBDFD0] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                              : ` hover:bg-[#dbdfd04e] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                            : section === "Cart"
                            ? location.pathname ===
                              `/${userState?.user?.account}/${section}`
                              ? ` bg-[#DBDFD0] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                              : ` hover:bg-[#dbdfd04e] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                            : section === "Orders"
                            ? location.pathname ===
                              `/${userState?.user?.account}/${section}`
                              ? ` bg-[#DBDFD0] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                              : ` hover:bg-[#dbdfd04e] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                            : section === "Tables"
                            ? location.pathname ===
                              `/${userState?.user?.account}/${section}`
                              ? ` bg-[#DBDFD0] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                              : ` hover:bg-[#dbdfd04e] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                            : section === "Raw Items"
                            ? location.pathname ===
                              `/${userState?.user?.account}/rawItems`
                              ? ` bg-[#DBDFD0] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                              : ` hover:bg-[#dbdfd04e] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                            : section === "Profile"
                            ? location.pathname ===
                              `/${userState?.user?.account}/Profile`
                              ? ` bg-[#DBDFD0] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                              : ` hover:bg-[#dbdfd04e] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                            : location.pathname === `/${section}`
                            ? ` bg-[#DBDFD0] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                            : ` hover:bg-[#dbdfd04e] rounded-[34px] w-fit h-fit px-[16px] py-[4px]`
                        }
                        onClick={(e: any) => {}}
                      >
                        {section}
                      </li>
                    </Link>
                  ))}
              </ul>
            </div>
          </>
        )}

        <Link to='/' className="lg:h-[38.67px] w-2/4 h-full mx-10">
          <img src={logo} alt="logo" />
        </Link>

        <div className="w-1/4" onClick={handleBook}>
          <WhiteBtnMenu
            name="book a table"
            class="hover:bg-[#DBDFD04e]"
            state={userState.state}
          />
        </div>
      </div>
    </>
  );
}
