"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginState, setLoginState] = useState(false);
  const [finishState, setFinishState] = useState(false);
  const [error, setError] = useState(false);
  async function handleFormSubmit(e: any) {
    e.preventDefault();
    
    setError(false);

    setLoginState(true);

    await signIn('credentials',{email, password, callbackUrl: '/'});

    setLoginState(true);

  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-sky-500 text-4xl">Login</h1>

      {error && (
        <div className="my-4 text-center font-semibold text-red-800">
          Error occured! Please try again later. <br />
        </div>
      )}

      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="Email"
          disabled={loginState}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          disabled={loginState}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          className="bg-indigo-100 w-full rounded-xl disabled:bg-gray-500 disabled:text-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          disabled={loginState}
          type="submit"
        >
          Login
        </button>
        <div className="text-center my-4 text-gray-500">
          or Login with prodiver
        </div>
        <button onClick={()=>signIn('google',{callbackUrl:'/'})} className="flex gap-4 justify-center g-transparent w-full rounded-xl hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          <Image
            src={"/google.png"}
            alt={""}
            width={"24"}
            height={"24"}
          ></Image>
          Login with Google
        </button>
        <div className="text-center my-4 text-gray-500 border-t p-4">
          Existing account?{" "}
          <Link className="underline" href="/login">
            Login here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}
