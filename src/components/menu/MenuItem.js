import Image from "next/image";
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import MenuItemTile from "./MenuItemTile";
import toast from "react-hot-toast";
import FlyingButton from "react-flying-item";
export default function MenuItem(menuItem) {
  const { image, name, description, price, sizes, extraIngredientPrices } =
    menuItem;
  const { addToCart } = useContext(CartContext);
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtra, setSelectedExtra] = useState([]);

  async function handleAddToCartButtonClick() {
    const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
    if (hasOptions && !showPopUp) {
      setShowPopUp(true);
      return;
    }
    addToCart(menuItem, selectedSize, selectedExtra);
    await new Promise(resolve => setTimeout(resolve, 400));
    setShowPopUp(false);
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
          className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div
            onClick={ev => ev.stopPropagation()}
            className="my-8 bg-white p-2 rounded-lg max-w-md">
            <div
              className="overflow-y-scroll p-2"
              style={{maxHeight:'calc(100vh - 100px)'}}>
              <Image
                src={image}
                alt={name}
                width={300} height={200}
                className="mx-auto" />
              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2">
                {description}
              </p>
              {sizes?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Pick your size</h3>
                  {sizes.map(size => (
                    <label
                      key={size._id}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1">
                      <input
                        type="radio"
                        onChange={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                        name="size"/>
                      {size.name} ${price + size.price}
                    </label>
                  ))}
                </div>
              )}
              {extraIngredientPrices?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Any extras?</h3>
                  {extraIngredientPrices.map(extraThing => (
                    <label
                      key={extraThing._id}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1">
                      <input
                        type="checkbox"
                        onChange={ev => handleExtraClick(ev, extraThing)}
                        checked={selectedExtra.map(e => e._id).includes(extraThing._id)}
                        name={extraThing.name} />
                      {extraThing.name} +${extraThing.price}
                    </label>
                  ))}
                </div>
              )}
              <FlyingButton
                targetTop={'5%'}
                targetLeft={'95%'}
                src={image}>
                <div className="primary bottom-2" style={{width: "100%"}}
                     onClick={handleAddToCartButtonClick}>
                  Add to cart ${selectedPrice}
                </div>
              </FlyingButton>
              <button
                className="mt-2"
                onClick={() => setShowPopUp(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile
        onAddToCart={handleAddToCartButtonClick}
        {...menuItem} />
    </>
  );
}
