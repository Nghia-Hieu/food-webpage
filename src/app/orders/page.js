"use client";
import UseProfile from "@/components/UseProfile";
import SectionHeaders from "@/components/layout/SectionHeaders";
import UserTabs from "@/components/layout/UserTabs";
import { dbTimeForHuman } from "@/libs/datetime";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const { loading, data: profile } = UseProfile();
  const [loadingOrders, setLoadingOrders]=useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders(){
    setLoadingOrders(true);
    fetch("/api/orders").then((res) => {
        res.json().then((orders) => {
          setOrders(orders.reverse());
          setLoadingOrders(false);
        });
      });
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={profile.admin} />
      <div className="mt-8">
        {loadingOrders && (
            <div className="items-center">Loading orders...</div>
        )}
        {orders?.length > 0 &&
          orders.map((order) => (
            // eslint-disable-next-line react/jsx-key
            <div className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6">
              <div className="grown flex flex-col md:flex-row items-center gap-6">
                <div>
                  <div
                    className={
                      (order.paid ? "bg-green-500" : "bg-red-500") +
                      " p-2 rounded-md text-white w-24 text-center"
                    }
                  >
                    {order.paid ? "Paid" : "Not paid"}
                  </div>
                </div>
                <div className="grow">
                  <div className="flex gap-2 items-center mb-1">
                    <div className="grow font-semibold">{order.userEmail}</div>
                    <div className="text-gray-500 text-xs">{dbTimeForHuman(order.createdAt)}</div>

                  </div>

                  <div className="text-gray-500 text-sm">
                    {order.cartProducts?.map((p) => p.name).join(", ")}
                  </div>
                </div>
              </div>

              <div className="justify-end text-right font-semibold flex gap-2 items-center whitespace-nowrap">
                <Link href={"/orders/" + order._id} className="button">
                  ShowOrder
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
