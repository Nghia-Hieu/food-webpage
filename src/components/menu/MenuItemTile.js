import AddToCartButton from "./AddToCart";
export default function MenuItemTile({ onAddToCart, ...item }) {
  const { image, description, name, price, sizes, extraIngredientPrices } =
    item;
  const hasSizesOrExtras = sizes?.length > 0 || extraIngredientPrices?.length > 0
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center cursor-pointer group hover:bg-indigo-100 hover:shadow-2xl hover:shadow-black/50 transition-all">
      <div className="text-center">
        <img
          src={image}
          alt="main-dish"
          className="max-h-auto max-h-24 block mx-auto"
        ></img>
      </div>
      <h4 className="font-semibold my-2">{name}</h4>
      <p className="text-gray-500 text-sm truncate line-clamp-3">
        {description}
      </p>
   <AddToCartButton hasSizesOrExtras={hasSizesOrExtras} onClick={onAddToCart} price={price} image={image}/>
    </div>
  );
}
