'use client';
import MenuItem from "../menu/MenuItem";
import { useEffect, useState } from "react";
export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(()=>{
    fetch('/api/menu-items').then(res=>{
      res.json().then(menuItems=>{
        const bestSellers = menuItems.slice(-3);
        setBestSellers(bestSellers);
      })
    })
  })
  return (
    <section className="">
      <div className="text-center mb-4">
        <h3 className="uppercase text-gray-500 font-semibold">Check out</h3>
        <h2 className="text-sky-600 font-bold text-4xl italic">Menu</h2>
      </div>
      <div className="grid sm:grid-cols-3 gap-4 ">
       {bestSellers?.length > 0 && bestSellers.map(item=>(
        // eslint-disable-next-line react/jsx-key
        <MenuItem key={item._id} {...item}/>
       ))}

      </div>
    </section>
  );
}
