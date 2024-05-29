import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface ItemQuantities {
  pizzaBoard: number;
  tomato: number;
  pepper: number;
  olive: number;
  cheese: number;
  chicken: number;
  salami: number;
  meat: number;
  sauce: number;
  onion: number;
}

interface NewItem {
  itemName: string;
  itemDescription: string;
  image: string;
  category: string;
  price: number;
  itemQuantaties: ItemQuantities;
}

export default function AddItems() {
  const categories = ["select","pizza", "pasta", "dessert", "kids"];
  const [newItem, setnewItem] = useState<NewItem>({
    itemName: "",
    itemDescription: "",
    image: "",
    category: "",
    price: 0,
    itemQuantaties: {
      pizzaBoard: 0,
      tomato: 0,
      pepper: 0,
      olive: 0,
      cheese: 0,
      chicken: 0,
      salami: 0,
      meat: 0,
      sauce: 0,
      onion: 0,
    },
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

  const handleQuantityChange = (
    e: ChangeEvent<HTMLInputElement>,
    name: keyof ItemQuantities
  ) => {
    const value = e.target.value ? parseInt(e.target.value) : 0;
    setnewItem({
      ...newItem,
      itemQuantaties: { ...newItem.itemQuantaties, [name]: value },
    });
    console.log(newItem);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { itemName, itemDescription, price, category } = newItem;
    if (itemName && itemDescription && price && category) {
      axios
        .post(`${process.env.REACT_APP_SERVER_DOMAIN}/admin/addItem`, {
          newItem: newItem,
        })
        .then((res: any) => {
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
              onChange={(e: any) => handleChange(e)}
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
              <label className="w-full" htmlFor="category">
                Item category
              </label>
              <select
                className=" outline-2 border border-slate-300 outline-slate-300 w-full"
                id="category"
                name="category"
                onChange={(e: any) => handleChange(e)}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="itemQuantaties">Item Quantaties</label>
              <div>
                <label htmlFor="pizzaBoard">pizza board</label>
                <input
                  className=" outline-2 border border-slate-300 outline-slate-300 w-full"
                  id="pizzaBoard"
                  type="number"
                  name="pizzaBoard"
                  onChange={(e) => handleQuantityChange(e, "pizzaBoard")}
                />
              </div>
              <div>
                <label htmlFor="tomato">tomato</label>
                <input
                  className=" outline-2 border border-slate-300 outline-slate-300 w-full"
                  id="tomato"
                  type="number"
                  name="tomato"
                  onChange={(e) => handleQuantityChange(e, "tomato")}
                />
              </div>
              <div>
                <label htmlFor="pepper">pepper</label>
                <input
                  className=" outline-2 border border-slate-300 outline-slate-300 w-full"
                  id="pepper"
                  type="number"
                  name="pepper"
                  onChange={(e) => handleQuantityChange(e, "pepper")}
                />
              </div>
              <div>
                <label htmlFor="olive">olive</label>
                <input
                  className=" outline-2 border border-slate-300 outline-slate-300 w-full"
                  id="olive"
                  type="number"
                  name="olive"
                  onChange={(e) => handleQuantityChange(e, "olive")}
                />
              </div>
              <div>
                <label htmlFor="cheese">cheese</label>
                <input
                  className=" outline-2 border border-slate-300 outline-slate-300 w-full"
                  id="cheese"
                  type="number"
                  name="cheese"
                  onChange={(e) => handleQuantityChange(e, "cheese")}
                />
              </div>
              <div>
                <label htmlFor="chicken">chicken</label>
                <input
                  className=" outline-2 border border-slate-300 outline-slate-300 w-full"
                  id="chicken"
                  type="number"
                  name="chicken"
                  onChange={(e) => handleQuantityChange(e, "chicken")}
                />
              </div>
              <div>
                <label htmlFor="salamai">salamai</label>
                <input
                  className=" outline-2 border border-slate-300 outline-slate-300 w-full"
                  id="salami"
                  type="number"
                  name="salami"
                  onChange={(e) => handleQuantityChange(e, "salami")}
                />
              </div>
              <div>
                <label htmlFor="meat">meat</label>
                <input
                  className=" outline-2 border border-slate-300 outline-slate-300 w-full"
                  id="meat"
                  type="number"
                  name="meat"
                  onChange={(e) => handleQuantityChange(e, "meat")}
                />
              </div>
              <div>
                <label htmlFor="sauce">sauce</label>
                <input
                  className=" outline-2 border border-slate-300 outline-slate-300 w-full"
                  id="sauce"
                  type="number"
                  name="sauce"
                  onChange={(e) => handleQuantityChange(e, "sauce")}
                />
              </div>
            </div>

            <button className="bg-[#AD343E] hover:bg-[#9a5359] w-full shadow-lg rounded-lg px-3 py-2">
              Add item
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
