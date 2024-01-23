import { useState } from "react";
import ChevronDown from "./icons/ChevronDown";
import ChevronUp from "./icons/ChevronUp";

export default function MenuItemPriceProps({
  name,
  addLabel,
  props,
  setProps,
}: {
  name: string;
  addLabel: string;
  props: any;
  setProps: any;
}) {
  // const [sizes, setSizes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  function addProp() {
    setProps((oldProps: any): any => {
      return [...oldProps, { name: "", price: 0 }];
    });
  }

  function editProp(ev: any, index: number, prop: any) {
    const newValue = ev.target.value;
    setProps((prevSized: any): any => {
      const newSizes = [...prevSized];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeProp(indexToRemove: number) {
    setProps((prev: any) =>
      prev.filter((v: any, index: number) => index !== indexToRemove)
    );
  }

  return (
    <div className="bg-gray-300 p-2 rounded-md mb-2">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex p-1 gap-1 border-0 justify-start"
        type="button"
      >
        {isOpen && <ChevronUp />}
        {!isOpen && <ChevronDown />}
        <span>{name} </span>
        <span>({props?.length})</span>
      </button>
      <div className={isOpen ? "block" : "hidden"}>
        {props?.length > 0 &&
          props.map((size: any, index: number) => (
            <div key={size} className="flex items-end gap-2">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Size name"
                  value={size.name}
                  onChange={(ev) => editProp(ev, index, "name")}
                />
              </div>
              <div>
                <label>Extra price</label>

                <input
                  type="text"
                  placeholder="Extra price"
                  value={size.price}
                  onChange={(ev) => editProp(ev, index, "price")}
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => removeProp(index)}
                  className="bg-white mb-4"
                >
                  x
                </button>
              </div>
            </div>
          ))}
      </div>

      <button type="button" onClick={addProp} className="bg-white">
        {addLabel}
      </button>
    </div>
  );
}
