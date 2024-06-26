"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({ isAdmin }: { isAdmin: boolean }) {
  const path = usePathname();
  return (
    <div className="flex mx-auto gap-2 tabs justify-center flex-wrap py-2">
      <Link className={path === "/profile" ? "active" : ""} href="/profile">
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link
            className={path.includes("/categories") ? "active" : ""}
            href="/categories"
          >
            Categories
          </Link>
          <Link
            className={path.includes("/menu-items") ? "active" : ""}
            href="/menu-items"
          >
            Menu Items
          </Link>
          <Link
            className={path.includes("/users") ? "active" : ""}
            href="/users"
          >
            Users
          </Link>
        </>
      )}
      <Link className={path.includes("/orders") ? "active" : ""} href="/orders">
        Orders
      </Link>
    </div>
  );
}
