import Image from "next/image";
export default function MenuItem() {
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center cursor-pointer group hover:bg-indigo-100 hover:shadow-2xl hover:shadow-black/50 transition-all">
      <div className="text-center">
        <img
          src="/main-dish.png"
          alt="main-dish"
          className="max-h-auto max-h-30 block mx-auto"
        ></img>
      </div>
      <h4 className="font-semibold my-2">Peors Dish</h4>
      <p className="text-gray-500 text-sm mb-1">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum culpa
        doloremque ratione officia facilis iusto explicabo rerum reprehenderit
        sequi dignissimos, aliquid consequatur voluptatibus voluptate quia nulla
        dolores possimus quod quaerat.
      </p>
      <button className="bg-sky-600 text-cyan-100 rounded-full px-6 py-2">
        Add to cart
      </button>
    </div>
  );
}
