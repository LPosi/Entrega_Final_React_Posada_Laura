import { useCart } from "../../context/CartContext";
import CartItem from "../CartItem/CartItem";
import "./Cart.css";

const Cart = () => {
  const { cart, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-icon">🛒</div>
        <h3>Tu carrito está vacío</h3>
        <p>Agrega productos para comenzar a comprar</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Productos en el Carrito</h2>
        <span className="items-count">{cart.length} items</span>
      </div>

      <div className="cart-items-list">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Envío</span>
          <span className="free-shipping">Gratis</span>
        </div>
        <div className="summary-divider"></div>
        <div className="summary-total">
          <span>Total</span>
          <span className="total-amount">${getTotalPrice().toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
