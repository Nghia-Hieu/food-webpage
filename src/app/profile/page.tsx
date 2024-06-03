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
import UserForm from "@/components/layout/UserForm";

export default function ProfilePage() {
  const session = useSession();

  const [user, setUser] = useState(null);
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetch, setProfileFetch] = useState(false);
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
     
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setUser(data);
          setIsAdmin(data.admin);
          setProfileFetch(true);
        });
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev: any, data: any ) {
    ev.preventDefault();
    const savingPromise = new Promise<void>(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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

  async function handleImageChange(ev: any, setImage: any) {
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
        <UserForm user={user} onSave={handleProfileInfoUpdate}/>
      </div>
      <div className="max-w-2xl mt-8 mx-auto"></div>
    </section>
  );
}
