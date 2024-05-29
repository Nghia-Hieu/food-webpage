import FlyingButton from "react-flying-item";

export default function AddToCartButton({
  hasSizesOrExtras,
  onClick,
  price,
  image,
}) {
  if (!hasSizesOrExtras) {
    return (
      <div className="flying-button-parent mt-4">
        <FlyingButton src={image} targetTop={"5%"} targetLeft={"95%"}>
          <div onClick={onClick} style={{width: "100%"}}> Add to cart ${price}</div>
        </FlyingButton>
      </div>
    );
  }
  return (
    <button
      onClick={onClick}
      className="mt-4 primary rounded-full px-8 py-2"
      type="button"
    >
      <span>Add to cart from ${price}</span>
    </button>
  );
}
