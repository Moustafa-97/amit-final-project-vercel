import React from "react";
import { useNavigate } from "react-router-dom";
const tablePic = require("./img/images.png");
export default function TableCard(props: any) {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate(`/Table/${props.id}`)}
        className="m-auto text-center flex flex-col justify-center items-center gap-[15px] w-full h-full rounded-xl border border-[#DBDFD0] stroke-[100%]"
      >
        <img
          className="m-auto bg-cover w-full rounded-t-xl"
          src={props.image === "" ? tablePic : props.image}
          alt="menu"
        />
        <p className="m-auto text-[#AD343E] font-bold text-[24px] leading-[30px]">
          ${props.Price}
        </p>
        <p className="m-auto text-[#2C2F24] font-bold text-[20px] leading-[26px]">
          {props.ItemName}
        </p>
        <p className="m-auto text-[#414536]  text-[16px] leading-[24px]">
          {props.ItemDescription}
        </p>
      </div>
    </>
  );
}
