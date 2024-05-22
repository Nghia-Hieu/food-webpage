"use client";
import image from "next/image";
import EditableImage from "./EditableImage";
import { useEffect, useState } from "react";
import { menu } from "@material-tailwind/react";
import MenuItemPriceProps from "./MenuItemPriceProps";

export default function MenuItemForm({
  onSubmit,
  menuItem,
}: {
  onSubmit: any;
  menuItem: any;
}) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [price, setPrice] = useState(menuItem?.price || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(
    menuItem?.extraIngredientPrices || []
  );
  const [category, setCategory] = useState(menuItem?.category || "");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  });

  return (
    <form
      className="mt-8 max-w-md mx-auto"
      onSubmit={(ev) =>
        onSubmit(ev, {
          image,
          name,
          description,
          price,
          sizes,
          extraIngredientPrices,
          category
        })
      }
    >
      <div
        className="grid items-start gap-4"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div>
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label>Item name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
          <label>Category</label>
          <select value={category} onChange={ev=> setCategory(ev.target.value)}>
            {categories?.length > 0 &&
              categories.map((c: any) => (
                <option value={c._id} key={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
          <label>Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></input>
          <MenuItemPriceProps
            name={"Sizes"}
            addLabel={"Add item size"}
            props={sizes}
            setProps={setSizes}
          />
          <MenuItemPriceProps
            name={"Extra ingredients"}
            addLabel={"Add ingredients prices"}
            props={extraIngredientPrices}
            setProps={setExtraIngredientPrices}
          />

          <button className="p-2" type="submit">
            Save
          </button>
        </div>
      </div>
      <div></div>
    </form>
  );
}
