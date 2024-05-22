"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useEffect, useState } from "react";
import MenuItem from "../../components/menu/MenuItem";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });

    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => setMenuItems(menuItems));
    });
  }, []);
  return (
    <section>
      {categories.length > 0 &&
        categories.map((c) => (
          // eslint-disable-next-line react/jsx-key
          <div>
            <div className="text-center">
              <SectionHeaders mainHeader={c.name} subHeader={""} />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 mb-12">
              {menuItems
                .filter((item) => item.category === c._id)
                .map((item) => (
                  // eslint-disable-next-line react/jsx-key
                  <MenuItem {...item} />
                ))}
            </div>
          </div>
        ))}
    </section>
  );
}