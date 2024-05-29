import axios from "axios";
import React, { useEffect, useState } from "react";
import WhiteBtn from "../components/buttons/WhiteBtn";

export default function RawItems() {
  const [raw, setRaw] = useState([]);
  const [edit, setEdit] = useState("");
  const [add, setAdd] = useState(false);
  const [itemToEdit, setItemToEdit] = useState({
    itemName: "",
    quantity: 0,
  });
  const [itemToAdd, setItemToAdd] = useState({
    itemName: "",
    quantity: 0,
  });
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_DOMAIN}/admin/getRaw`)
      .then((res) => setRaw(res.data.raw))
      .catch((err) => console.log(err));
  }, []);
  const handleNumber = (e: React.FormEvent<HTMLInputElement> | any) => {
    setItemToEdit((pre: any) => {
      return {
        ...pre,
        quantity: e.target.value,
      };
    });
  };
  const handleInput = (e: React.FormEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;
    setItemToAdd((pre: any) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const handleEdit = (e: any) => {
    axios
      .put(`${process.env.REACT_APP_SERVER_DOMAIN}/admin/updateRaw`, {
        data: itemToEdit,
        _id: e,
      })
      .then((res) => setRaw(res.data.raw))
      .catch((err) => console.log(err));
  };
  const handleSubmit = (e: any) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_DOMAIN}/admin/addRaw`, {
        newRawItem: itemToAdd,
      })
      .then((res) => setRaw(res.data.raw))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className=" min-h-screen">
        <header className="flex justify-center items-center flex-col m-auto lg:w-[35%] text-center gap-5 mb-[50px]">
          <h2 className=" font-[playfair] text-[100px] leading-[96px]">
            Raw Items
          </h2>
        </header>
        <div className="w-full flex justify-center items-center flex-col gap-2 m-auto">
          {raw && add ? (
            <div>
              <form
                className="flex justify-center items-start flex-col"
                onSubmit={handleSubmit}
              >
                <label htmlFor="itemName">Item Name</label>
                <input
                  type="text"
                  id="itemName"
                  name="itemName"
                  className="text-2xl font-bold my-2 border"
                  onChange={handleInput}
                />
                <label htmlFor="quantity">Quatity</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  className="text-2xl font-bold my-2 border"
                  onChange={handleInput}
                />
                <button className="lg:px-[32px] lg:py-[20px] px-4 py-3 lg:w-fit lg:h-[64px] w-full h-full rounded-[118px] border-[#182226] border m-auto">
                  Add
                </button>
              </form>
            </div>
          ) : (
            raw.map((raw: any) => (
              <div
                key={raw._id}
                className="w-1/2 bg-white shadow-md rounded-lg p-6 max-w-md"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-700">
                      Item Id: {raw._id}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      raw.quantity <= 10
                        ? `bg-red-200 text-red-800`
                        : raw.quantity <= 100
                        ? `bg-yellow-200 text-yellow-800`
                        : `bg-green-200 text-green-800`
                    } `}
                  >
                    {raw.quantity <= 10
                      ? `More Inventory`
                      : raw.quantity <= 100
                      ? `Alert`
                      : `Active`}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                      Item Name: {raw.itemName}
                    </h3>
                    <p className="text-gray-500">
                      Quantity:{" "}
                      {edit === raw._id ? (
                        <input
                          type="number"
                          onChange={(e) => handleNumber(e)}
                          placeholder={raw.quantity}
                        />
                      ) : (
                        raw.quantity
                      )}
                    </p>
                  </div>
                  <button
                    key={raw._id}
                    onClick={() => {
                      setEdit(raw._id);
                      if (edit) {
                        handleEdit(raw._id);
                        setEdit("");
                      }
                    }}
                    className="lg:px-5 lg:py-2 px-4 py-1 lg:w-fit lg:h-fit w-full h-full rounded-[118px] border-[#182226] border m-auto"
                  >
                    {edit === raw._id ? "Save" : "Edit"}
                  </button>
                </div>
              </div>
            ))
          )}
          <button
            onClick={() => {
              setAdd(!add);
              if (add) {
                setAdd(false);
              }
            }}
            className="lg:px-[32px] lg:py-[20px] px-4 py-3 lg:w-fit lg:h-[64px] w-full h-full rounded-[118px] border-[#182226] border m-auto"
          >
            {add ? "Cancel" : "Add New Item"}
          </button>
        </div>
      </div>
    </>
  );
}
