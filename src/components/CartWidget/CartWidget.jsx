import { useCart } from "../../context/CartContext";

const CartWidget = () => {
  const { getTotalQuantity } = useCart();

  return (
    <Link to="/cart">
      <img src="carrito-icono.png" alt="Carrito" />
      {getTotalQuantity() > 0 && <span>{getTotalQuantity()}</span>}
    </Link>
  );
};
