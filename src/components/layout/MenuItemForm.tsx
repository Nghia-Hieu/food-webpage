"use client";
import image from "next/image";
import EditableImage from "./EditableImage";
import { useState } from "react";
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
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);

  return (
    <form
      className="mt-8 max-w-md mx-auto"
      onSubmit={(ev) => onSubmit(ev, { image, name, description, price, sizes, extraIngredientPrices })}
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
          <label>Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></input>
          {/* <div className="bg-gray-300 p-2 rounded-md">
            <label>Sizes</label>
            {sizes?.length > 0 &&
              sizes.map((size, index) => (
                <div key={size} className="flex items-end gap-2">
                  <div>
                    <label>Size name</label>
                    <input
                      type="text"
                      placeholder="Size name"
                      value={size.name}
                      onChange={(ev) => editSize(ev, index, "name")}
                    />
                  </div>
                  <div>
                    <label>Extra price</label>

                    <input
                      type="text"
                      placeholder="Extra price"
                      value={size.price}
                      onChange={(ev) => editSize(ev, index, "price")}
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeSize(index)}
                      className="bg-white mb-2"
                    >
                      x
                    </button>
                  </div>
                </div>
              ))}
            <button type="button" onClick={addSize} className="bg-white">
              Add size (like medium or large)
            </button>
          </div> */}
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
