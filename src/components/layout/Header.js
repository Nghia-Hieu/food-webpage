"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../AppContext";
import Bar from "@/components/layout/icons/Bar";
import ShoppingCart from "./icons/ShoppingCart";
import { useState } from "react";

function AuthLinks({ status, username }) {
  if (status === "authenticated") {
    return (
      <>
        <Link
          href="/profile"
          className="no-underline whitespace-nowrap text-gray-500"
        >
          Hello, {username}
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-sky-600	rounded-full text-white px-8 py-2"
        >
          Logout
        </button>
      </>
    );
  }
  if (status === "unauthenticated") {
    return (
      <>
        <Link href="/login" className=" text-gray-500 no-underline">
          Login
        </Link>
        <Link
          href="/register"
          className="bg-sky-600	rounded-full text-white px-8 py-2"
          style={{ textDecoration: "none" }}
        >
          Register
        </Link>
      </>
    );
  }
}

export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let username = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  if (username?.includes("")) {
    username = username.split(" ")[0];
  }
  return (
    <>
      <header>
        <div className="flex items-center md:hidden justify-between">
          <Link className=" text-sky-500 text-3xl no-underline" href="/">
            Recuisine Lafonte
          </Link>
          <div className="flex gap-8 items-center">
            <Link href={"/cart"} className="relative">
              <ShoppingCart />
              <span className="absolute -top-2 -right-3 bg-primary text-white text-xs py-1 px-1 rounded-full leading-23">
                {cartProducts.length}
              </span>
            </Link>
            <button className="p-1 border-0" onClick={()=>setMobileNavOpen(prev=>!prev)}>
              <Bar />
            </button>
          </div>
        </div>
        {mobileNavOpen && (
          <div className="md:hidden bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center">
            <Link href="/" className=" text-gray-700 no-underline">
              Home
            </Link>
            <Link href="/menu" className="text-gray-700 no-underline">
              Menu
            </Link>
            <Link href="/#about" className="text-gray-700 no-underline">
              About
            </Link>
            <Link href="/#contact" className="text-gray-700 no-underline">
              Contact
            </Link>
            <AuthLinks status={status} username={username} />
          </div>
        )}

        <div className="hidden md:flex items-center justify-between">
          <nav className="flex items-center gap-8 text-red-600 font-semibold">
            <Link className=" text-sky-500 text-3xl no-underline" href="/">
              Recuisine Lafonte
            </Link>
            <Link href="/" className=" text-gray-500 no-underline">
              Home
            </Link>
            <Link href="/menu" className=" text-gray-500 no-underline">
              Menu
            </Link>
            <Link href="/#about" className=" text-gray-500 no-underline">
              About
            </Link>
            <Link href="/#contact" className=" text-gray-500 no-underline">
              Contact
            </Link>
          </nav>
          <nav className="flex items-center gap-8 text-gray-600 font-semibold">
            <AuthLinks status={status} username={username} />
            <Link href={"/cart"} className="relative">
              <ShoppingCart />
              <span className="absolute -top-2 -right-3 bg-primary text-white text-xs py-1 px-1 rounded-full leading-23">
                {cartProducts.length}
              </span>
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
