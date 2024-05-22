"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../AppContext";

export default function Header() {
  const session = useSession();
  // console.log(session);
  const status = session.status;
  const userData = session.data?.user;
  let username = userData?.name || userData?.email;
  const {cartProducts}= useContext(CartContext);
  if(username?.includes('')){
    username = username.split(' ')[0];
  }
  return (
    <>
      <header className="flex items-center justify-between">
        <nav className="flex items-center gap-8 text-red-600 font-semibold">
          <Link
            className=" text-sky-500 text-3xl no-underline"
            href="/"
          >
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
          {status === "authenticated" && (
            <>
              <Link href="/profile" className="no-underline whitespace-nowrap text-gray-500">Hello, {username}</Link>
              <button
                onClick={() => signOut()}
                className="bg-sky-600	rounded-full text-white px-8 py-2"
              >
                Logout
              </button>
            </>
          )}

          {status !== "authenticated" && (
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
          )}
              <Link href = {'/cart'}>Cart ({cartProducts.length})</Link>
        </nav>
      </header>
    </>
  );
}