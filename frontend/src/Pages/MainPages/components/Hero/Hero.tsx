import React from "react";
import RedBtn from "../buttons/RedBtn";
import WhiteBtn from "../buttons/WhiteBtn";
import { useSelector } from "react-redux";

const hero = require("./img/httpsi.ibb.cob2HGV9Zbg.png");
export default function Hero() {
  const user = useSelector((state: any) => state.Login.user?.user?.account);
  return (
    <>
      <div>
        <div className={`absolute overflow-hidden bg-cover h-screen w-screen imgCover`}>
        </div>
        <div className="absolute px-2 top-[25%] w-full text-center m-auto flex justify-center items-center">
          <div>
            <div className=" lg:w-[667px] lg:h-[192px] w-full h-full lg:leading-[92px] text-wrap lg:text-[100px] text-[50px] text-[#2C2F24] font-[playfair]">
              <span>Best food for your taste</span>
            </div>
            <div className=" lg:w-[537px] lg:h-[64px] w-1/2 h-full m-auto text-wrap lg:text-[20px] text-[100%] text-[#2C2F24] font-[sans]">
              <span>
                Discover delectable cuisine and unforgettable moments in our
                welcoming, culinary haven.
              </span>
            </div>
            {/* <div className="w-full flex items-center justify-center gap-[10px]"> */}
            {user === "admin" ? (
              <div className="w-full flex items-center justify-center gap-[10px]">
                <div>
                  <WhiteBtn name={"Explore Menu"} link="/Menu" />
                </div>
              </div>
            ) : (
              <div className="w-full flex items-center justify-center gap-[10px]">
                <div>
                  <RedBtn name={"Book a table"} link={`Table`} />
                </div>
                <div>
                  <WhiteBtn name={"Explore Menu"} link="/Menu" />
                </div>
              </div>
            )}
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
