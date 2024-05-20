"use client";
import UseProfile from "@/components/UseProfile";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import Right from "@/components/layout/icons/Right";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState([]);
  const { loading, data } = UseProfile();
  useEffect(() => {  console.log(data);

    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);
  if (loading) {
    return "Loading user info...";
  }
  if (!data?.admin) {
    return "Not an admin";
  }
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true}></UserTabs>
      <div className="mt-8">
        <Link className="button" href="/menu-items/new">
          <span className="mr-1"> Create new menu item</span>
          <Right />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit menu item: </h2>
        <div className="grid grid-cols-4 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((item: any) => (
              <Link
                key={item.name}
                href={"/menu-items/edit/" + item._id}
                className="bg-gray-300 rounded-lg"
              >
                <div className="relative">
                  <Image
                  className="rounded-md "
                    src={item.image}
                    alt={""}
                    width={200}
                    height={200}
                  ></Image>
                </div>
                <div className="text-center">{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
