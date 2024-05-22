import Image from "next/image";
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import MenuItemTile from "./MenuItemTile";
import toast from "react-hot-toast";
export default function MenuItem(menuItem) {
  const { image, name, description, price, sizes, extraIngredientPrices } =
    menuItem;
  const { addToCart } = useContext(CartContext);
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtra, setSelectedExtra] = useState([]);

  function handleAddToCartButtonClick() {
    const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
    if (hasOptions && !showPopUp) {
      setShowPopUp(true);
      return;
    }
    addToCart(menuItem, selectedSize, selectedExtra);
    setShowPopUp(false);
    toast.success("Added to cart");
  }

  function handleExtraClick(ev, extra) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtra((prev) => [...prev, extra]);
    } else {
      setSelectedExtra((prev) => {
        return prev.filter((e) => e.name !== extra.name);
      });
    }
  }

  let selectedPrice = price;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
    if (selectedExtra?.length > 0) {
      for (const extra of selectedExtra) {
        selectedPrice += extra.price;
      }
    }
  }

  return (
    <>
      {showPopUp && (
        <div
          onClick={() => setShowPopUp(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="my-8 bg-white p-4 rounded-lg max-w-md"
          >
            <div
              className="overflow-y-scroll p-2"
              style={{ maxHeight: "calc(100vh-100px)" }}
            >
              <Image
                src={image}
                alt={name}
                width={300}
                height={200}
                className="mx-auto"
              ></Image>
              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-gray-600 text-sm mb-2">
                {description}
              </p>
              {sizes?.length > 0 && (
                <div className="p-2">
                  <h3 className="text-center text-gray-500">Pick size</h3>
                  {sizes.map((size) => (
                    // eslint-disable-next-line react/jsx-key
                    <label className="flex items-center gap-2 p-4 border rounded-md mb-1">
                      <input
                        type="radio"
                        name="size"
                        onClick={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                      />
                      {size.name} +$
                      {price + size.price}
                    </label>
                  ))}
                </div>
              )}

              {extraIngredientPrices?.length > 0 && (
                <div className="p-2">
                  <h3 className="text-center text-gray-500">Pick extra</h3>
                  {extraIngredientPrices.map((extra) => (
                    // eslint-disable-next-line react/jsx-key
                    <label className="flex items-center gap-2 p-4 border rounded-md mb-1">
                      <input
                        type="checkbox"
                        name={extra.name}
                        onClick={(ev) => handleExtraClick(ev, extra)}
                      />
                      {extra.name} +${price + extra.price}
                    </label>
                  ))}
                </div>
              )}
              <button
                onClick={handleAddToCartButtonClick}
                className="primary sticky bottom-2"
                type="button"
              >
                Add to cart ${selectedPrice}
              </button>
              <button className="mt-2" onClick={() => setShowPopUp(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
}
