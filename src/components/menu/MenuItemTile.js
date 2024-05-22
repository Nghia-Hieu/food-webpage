export default function MenuItemTile({ onAddToCart, ...item }) {
  const { image, description, name, price, sizes, extraIngredientPrices } =
    item;
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
      <button
        onClick={onAddToCart}
        className="bg-sky-600 text-cyan-100 rounded-full px-6 py-2"
      >
        {sizes?.length > 0 || extraIngredientPrices?.length > 0 ? (
          <span>Add to cart from ${price}</span>
        ) : (
          <span> Add to cart ${price}</span>
        )}
      </button>
    </div>
  );
}
