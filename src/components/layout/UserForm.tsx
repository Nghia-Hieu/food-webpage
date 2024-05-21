"use client";
import { useState } from "react";
import UseProfile from "@/components/UseProfile";
import EditableImage from "./EditableImage";

export default function UserForm({
  user,
  onSave,
}: {
  user: any;
  onSave: (ev: any, data: any) => void;
}) {
  const [username, setUsername] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [city, setCity] = useState(user?.city || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [country, setCountry] = useState(user?.country || "");
  const [admin, setAdmin]= useState(user?.admin || false);
  const {data:loggedInUserData} = UseProfile();
  return (
    <div className="flex gap-4">
      <div>
        <div className="bg-white p-2 rounded-lg max-w-[120px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={(ev) =>
          onSave(ev, {
            name: username,
            image,
            phone,
            admin,
            streetAddress,
            city,
            country,
            postalCode,
          })
        }
      >
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
          value={user.email}
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
        <div className="grid grid-cols-2 gap-4">
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
        {loggedInUserData.admin &&(
            <div>
          <label className="p-2 inline-flex items-center borrder mb-2" htmlFor="adminCb">
            <input id="adminCb" type="checkbox" className="mr-2" value={'1'} checked={admin}
            onClick={ev => setAdmin(ev.target?.checked)}/>
            <span>Admin</span>
          </label>
        </div>
        )}
        
        <button
          type="submit"
          className="w-full bg-sky-600  text-white rounded-full px-8 py-2"
        >
          Save
        </button>
      </form>
    </div>
  );
}
