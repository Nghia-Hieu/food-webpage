"use client";
import DeleteButton from "@/components/DeleteButton";
import useProfile from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Categories() {
  const { loading: profileLoading, data: profileData } = useProfile();
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [editedCategory, setEditedCategory] = useState(null);

  const handleCategorySubmit = async (ev: any) => {
    ev.preventDefault();
    const data = { name: categoryName };
    if (editedCategory) {
      data._id = editedCategory._id;
    }
    const creationPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setCategoryName("");
      fetchCategories();
      setEditedCategory(null);
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(creationPromise, {
      loading: editedCategory
        ? "Updating category..."
        : "Creating new category...",
      success: editedCategory
        ? "Category updated successfully"
        : "Category created successfully",
      error: "Error, please try later",
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  async function handleDeleteClick(_id: any) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error",
    });

    fetchCategories();
  }

  if (profileLoading) {
    return "Loading user info...";
  }

  if (!profileData?.admin) {
    return "Not an admin";
  }

  return (
    <section className=" mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true}></UserTabs>
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedCategory ? "Update category" : "New category name"}
              {editedCategory && (
                <>
                  : <b>{editedCategory.name}</b>
                </>
              )}
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
            ></input>
          </div>
          <div className="pb-4 flex gap-2">
            <button className="border border-purple-50" type="submit">
              {editedCategory ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setCategoryName("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 ml-1 text-sm text-gray-500">Edit Category: </h2>
        {categories?.length > 0 &&
          categories.map((c: any) => (
            <div
              className="bg-gray-100 border-sky-300 rounded-xl p-2 px-4 mb-1 cursor-pointer flex gap-1 items-center"
              key={c?.name}
            >
              <div className="grow">{c?.name}</div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setEditedCategory(c);
                    setCategoryName(c.name);
                  }}
                >
                  Edit
                </button>
                <DeleteButton label="Delete" onDelete={()=>handleDeleteClick(c._id)}>

                </DeleteButton>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
