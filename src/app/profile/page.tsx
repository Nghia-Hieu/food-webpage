"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import defaultImage from "../../../public/google.png";
import { useEffect, useState } from "react";
import InfoBox from "@/components/layout/InfoBox";
import SuccessBox from "@/components/layout/SuccessBox";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/EditableImage";
import Right from "@/components/layout/icons/Right";

export default function ProfilePage() {
  const session = useSession();
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetch, setProfileFetch] = useState(false);
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      setUsername(session.data.user.name);
      setImage(session.data.user.image);
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          console.log(data);
          setPhone(data.phone);
          setStreetAddress(data.streetAddress);
          setCity(data.city);
          setPostalCode(data.postalCode);
          setCountry(data.country);
          setIsAdmin(data.admin);
          setProfileFetch(true);
        });
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev: any) {
    ev.preventDefault();
    const savingPromise = new Promise<void>(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: username,
          image,
          streetAddress,
          phone,
          postalCode,
          city,
          country,
        }),
      });

      if (response.ok) {
        const link = await response.json();
        resolve();
      } else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile updated!",
      error: "Saving profile error",
    });
  }

  async function handleImageChange(ev: any) {
    const file = ev.target.files;
    if (file?.length === 1) {
      const data = new FormData();
      data.set("file", file[0]);

      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((link) => {
            setImage(link);
          });
        }
        throw new Error("Something went wrong");
      });
      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Image updated!",
        error: "Upload error",
      });
    }
  }

  if (status === "loading" || !profileFetch) {
    return "Loading...";
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-2xl mx-auto mt-8 mb-8">
        <Link href="/menu-items" className="button">
          <span>Show all menu items</span>
          <Right />
        </Link>
      </div>
      <div className="max-w-md mx-auto">
        <div className="flex gap-4">
          <div>
            <div className="bg-white p-2 rounded-lg max-w-[120px]">
              {/* {image && (
                <Image
                  className="rounded-lg w-full h-full mb-1"
                  src={image}
                  width={120}
                  height={120}
                  alt={"avatar"}
                ></Image>
              )}

              <label>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <span className="block border-gray-300 rounded-lg p-2 text-center cursor-pointer">
                  Edit
                </span>
              </label> */}
              <EditableImage link={image} setLink={setImage} />
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <label>First and last name</label>
            <input
              type="text"
              placeholder="First and last name"
              className="semi-bold"
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
            ></input>
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              disabled={true}
              className="disabled: text-gray-500 disabled: bg-gray-700"
              value={session.data?.user.email}
            ></input>

            <label>Telephone</label>
            <input
              type="tel"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
              placeholder="Phone number"
            ></input>
            <label>Street address</label>
            <input
              type="text"
              value={streetAddress}
              onChange={(ev) => setStreetAddress(ev.target.value)}
              placeholder="Street address"
            ></input>
            <div className="flex gap-4">
              <div>
                <label>City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(ev) => setCity(ev.target.value)}
                  placeholder="City"
                ></input>
              </div>
              <div>
                <label>Postal code</label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(ev) => setPostalCode(ev.target.value)}
                  placeholder="Postal code"
                ></input>
              </div>
            </div>
            <label>Country</label>
            <input
              type="text"
              value={country}
              onChange={(ev) => setCountry(ev.target.value)}
              placeholder="Country"
            ></input>

            <button
              type="submit"
              className="w-full bg-sky-600  text-white rounded-full px-8 py-2"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
