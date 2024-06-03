"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Trash from "@/components/layout/icons/Trash";
import AddressInput from "@/components/layout/AddressInput";
import CartProduct from "@/components/menu/CartProduct";
import UseProfile from "@/components/UseProfile";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = UseProfile();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("canceled=1")) {
        toast.error("Payment failed! ");
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country,
      };

      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let subtotal = 0;
  for (const product of cartProducts) {
    subtotal += cartProductPrice(product);
  }
  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => {
      return { ...prevAddress, [propName]: value };
    });
  }

  async function proceedToCheckout(ev) {
    ev.preventDefault();
    const promise = new Promise(async (resolve, reject) => {
      await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    await toast.promise(promise, {
      loading: "Preparing order...",
      success: "Redirecting to payment",
      error: "Something went wrong... Try again",
    });
  }

  if (cartProducts?.length === 0) {
    return (
      <section>
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4">Empty cart</p>
      </section>
    );
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
              <CartProduct product={product} onRemove={removeCartProduct} />
            ))}
          <div className="py-2 flex justify-end items-center pr-16">
            <div className="text-gray-500">
              Subtotal: <br />
              Delivery: <br />
              Total:{" "}
            </div>
            <div className="text-lg font-semibold pl-2">
              ${subtotal} <br />
              $5 <br />${subtotal + 5}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <label type="text" placeholder="Street address"></label>
            <AddressInput
              addressProps={address}
              setAddressProps={handleAddressChange}
            />
            <button type="submit">Pay ${subtotal + 5}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
