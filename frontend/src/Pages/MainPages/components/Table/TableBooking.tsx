import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RedBtn from "../../components/buttons/RedBtn";
import axios from "axios";
import { userData } from "../../../../Redux/reduxTools/HandleUserLogin";
import NotLogged from "../../components/NotLogged/NotLogged";
const menuPic = require("./img/images.png");

interface itemDetails {
  _id: String;
  itemName: String;
  price: Number;
}

interface userTable {
  itemDetails: itemDetails;
  quantity: Number;
}

export default function TableBooking(props: any) {
  const dispatch = useDispatch();
  const item = props.item;

  const user: string = useSelector(
    (state: any) => state.Login.user.user?.account
  );
  const userState: boolean = useSelector(
    (state: any) => state.Login.user?.state
  );

  const [itemQuantity, setItemQuantity] = useState(1);

  const [userTable, setUserTable] = useState<userTable>({
    itemDetails: {
      _id: "",
      itemName: "",
      price: 0,
    },
    quantity: 0,
  });

  useEffect(() => {
    setUserTable({
      itemDetails: {
        _id: item._id,
        itemName: item.itemName,
        price: item.price ? item.price : 0,
      },
      quantity: itemQuantity,
    });
  }, [item.itemName, item.price, item._id, itemQuantity]);

  const handleAction = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_DOMAIN}/user/bookTable`, {
        table: userTable,
      })
      .then((res) => {
        dispatch(userData(res.data));
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleRemove = (e: any) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_DOMAIN}/admin/removeTable`, {
        id: e,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {userState ? (
        props.item && (
          <div className="lg:w-[80%] w-full h-screen m-auto flex justify-center items-center">
            <div className="flex justify-center items-start m-auto h-[80%] w-full lg:flex-row flex-col">
              <div className="w-1/2 m-auto mt-0">
                <img
                  className=" w-full"
                  src={item.image === "" ? menuPic : item.image}
                  alt="foodpic"
                />
              </div>
              <div className="w-1/2 m-auto mt-0 h-full">
                <header className="flex justify-start items-start flex-col m-auto w-full gap-5 mb-[30px] h-[85%] ">
                  <h2 className=" font-[playfair] text-[80px] leading-[96px]">
                    {item.itemName}
                  </h2>
                  <p className=" leading-7 text-[16px]">
                    {item.itemDescription}
                  </p>
                </header>
                <div className="h-[15%] flex justify-center items-center">
                  {user === "admin" ? (
                    <div className="flex justify-center items-start m-auto w-full h-full lg:flex-row flex-col">
                      <RedBtn
                        name="Edit"
                        isFunction={false}
                        link={`/admin/editItem/${item._id}`}
                      />
                      <RedBtn
                        name="Remove"
                        isFunction={true}
                        function={() => handleRemove(item._id)}
                        link="/Menu"
                      />
                    </div>
                  ) : (
                    <div className="flex justify-center items-start m-auto w-full h-full lg:flex-row flex-col">
                      <form
                        onSubmit={handleAction}
                        className="w-full h-full flex justify-center items-center m-auto lg:flex-row flex-col"
                      >
                        <div className="lg:w-1/2 w-full h-full m-auto flex justify-center items-center">
                          <label
                            className="text-center m-auto"
                            htmlFor="ItemQuantity"
                          >
                            Quantity
                          </label>
                          <input
                            className=" text-[25px] outline-2 border border-slate-300 outline-slate-300 lg:w-1/5 w-1/2 h-[50px] m-auto flex justify-center items-center"
                            id="ItemQuantity"
                            type="number"
                            value={itemQuantity}
                            min={0}
                            name="ItemQuantity"
                            onChange={(e: FormEvent<HTMLInputElement> | any) =>
                              setItemQuantity(e.target.value)
                            }
                          />
                        </div>
                        <div className="lg:w-1/2 w-full h-full m-auto flex justify-center items-center">
                          <RedBtn
                            name="Add to cart"
                            link="/"
                            isFunction={true}
                            function={handleAction}
                          />
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <NotLogged />
      )}
    </>
  );
}
