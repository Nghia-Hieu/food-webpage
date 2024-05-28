"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useContext, useState } from "react";
import Image from "next/image";
import Trash from "@/components/layout/icons/Trash";
import AddressInput from "@/components/layout/AddressInput";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  let total = 0;
  for (const product of cartProducts) {
    total += cartProductPrice(product);
  }
  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => {
      return { ...prevAddress, [propName]: value };
    });
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader={"Cart"}></SectionHeaders>
      </div>
      <div className="mt-4 grid gap-4 grid-cols-2">
        <div>
          {cartProducts?.length === 0 && <div>No products</div>}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              // eslint-disable-next-line react/jsx-key
              <div className="flex items-center gap-4 mb-2 border-b py-2">
                <div className="w-24">
                  <Image
                    width={240}
                    height={240}
                    src={product.image}
                    alt={""}
                  />
                </div>
                <div className="grow">
                  <h3 className="font-semibold"> {product.name}</h3>
                  {product.size && (
                    <div className="text-sm">
                      Size : <span>{product.size.name}</span>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div className="text-sm text-gray-500">
                      Extras:
                      {product.extras.map((extra) => (
                        // eslint-disable-next-line react/jsx-key
                        <div>
                          {extra.name} ${extra.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-lg font-semibold">
                  ${cartProductPrice(product)}
                </div>
                <div className="ml-2">
                  <button
                    className="p-2"
                    onClick={() => removeCartProduct(index)}
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          <div className="py-4 text-right pr-16">
            <span className="text-gray-500"> Total:</span>
            <span className="text-lg font-semibold pl-2">${total}</span>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form>
            <label type="text" placeholder="Street address"></label>
            <AddressInput
              addressProps={{ address }}
              setAddressProps={handleAddressChange}
            />
            <button type="submit">Pay ${total}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
