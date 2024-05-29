import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Tables from "../ForAll/Tables";
import { CartManageSection } from "../../../Redux/reduxTools/CartManageHandler";
import ItemsCart from "../components/Cart/ItemsCart";
import TableCart from "./TableCart";

export default function Manage() {
  const dispatch = useDispatch();
  const manageSection = useSelector((state: any) => state.cartManage.manage);

  const manage = ["Items", "Tables"];
  return (
    <>
      <div className="min-h-screen">
        <header className="flex justify-center items-center flex-col m-auto lg:w-[35%] text-center gap-5 mb-[50px] h-1/3">
          <h2 className=" font-[playfair] text-[100px] leading-[96px]">Cart</h2>
        </header>
        <nav className=" w-full flex items-center justify-center m-auto">
          <ul className=" list-none flex items-center justify-center lg:w-[433px] lg:h-[32px] w-full h-full lg:gap-[8px] rounded-[34px]">
            {manage &&
              manage.map((section) => (
                <li
                  key={Math.random()}
                  className={
                    manageSection === `${section}`
                      ? `cursor-pointer bg-[#AD343E] rounded-[34px] w-fit h-[32px] px-[16px] py-[4px] text-center`
                      : `cursor-pointer hover:bg-[#dbdfd04e] rounded-[34px] w-fit h-[32px] px-[16px] py-[4px]`
                  }
                  onClick={(e: any) => {
                    dispatch(CartManageSection(section));
                  }}
                >
                  {section}
                </li>
              ))}
          </ul>
        </nav>
        <div>
          {manageSection === "Items" ? (
            <ItemsCart />
          ) : manageSection === "Tables" ? (
            <TableCart />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
