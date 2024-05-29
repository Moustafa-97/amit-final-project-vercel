import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface NewItem {
  itemName: string;
  itemDescription: string;
  image: string;
  category: string;
  price: number;
}

export default function EditTables() {
  const id = useParams();

  const [newItem, setnewItem] = useState<NewItem>({
    itemName: "",
    itemDescription: "",
    image: "",
    category: "",
    price: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(e.target);

    setnewItem((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { itemName, itemDescription, price, category } = newItem;
    if (itemName && itemDescription && price && category) {
      axios
        .put(`${process.env.REACT_APP_SERVER_DOMAIN}/admin/updateTable`, {
          id: id.id,
          data: newItem,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center my-9 h-fit w-full">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-start justify-center m-auto gap-2 w-full">
            <label htmlFor="itemName">Item name</label>
            <input
              className=" outline-2 border border-slate-300 outline-slate-300 w-full"
              id="itemName"
              type="itemName"
              name="itemName"
              onChange={handleChange}
            />
            <label htmlFor="itemDescription">Item Description</label>
            <textarea
              className=" outline-2 border border-slate-300 outline-slate-300 w-full"
              id="itemDescription"
              rows={4}
              cols={50}
              name="itemDescription"
              onChange={(e: any) => handleChange(e)}
            />
            <div className="flex justify-center items-center m-auto gap-1">
              <label className="w-full" htmlFor="price">
                Item price
              </label>
              <input
                className=" outline-2 border border-slate-300 outline-slate-300 w-full"
                id="price"
                type="number"
                step={0.01}
                name="price"
                onChange={handleChange}
              />
            </div>

            <button className="bg-[#AD343E] hover:bg-[#9a5359] w-full shadow-lg rounded-lg px-3 py-2">
              Edit Table
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
