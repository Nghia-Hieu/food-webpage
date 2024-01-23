"use client";
import UseProfile from "@/components/UseProfile";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import Left from "@/components/layout/icons/Left";
import Right from "@/components/layout/icons/Right";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
export default function NewMenuItemPage() {
  const { loading, data } = UseProfile();
  const [redirectToItems, setRedirectToItems] = useState(false);
  // const [image, setImage] = useState("");
  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  // const [price, setPrice] = useState("");
  

  async function handleFormSubmit(ev: any, data: any) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify({
          data
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(savingPromise, {
      loading: "Saving item...",
      success: "Saved item",
      error: "Error",
    });

     setRedirectToItems(true);
  }

  if(redirectToItems){
    return redirect('/menu-items');
  }
  if (loading) {
    return "Loading user info...";
  }

  if (!data?.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-md mx-auto mt-8">
        <Link href="/menu-items" className="button">
          <Left/>
          <span className="ml-1">Show all menu items</span>
        </Link>
      </div>

      <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />

      {/* <form className="mt-8 max-w-md mx-auto" onSubmit={handleFormSubmit}>
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
            <button type="submit">Create</button>
          </div>
        </div>
        <div></div>
      </form> */}
    </section>
  );
}
