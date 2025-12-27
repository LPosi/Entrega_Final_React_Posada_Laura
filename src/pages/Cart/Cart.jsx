import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Cart from "../../components/Cart/Cart";
import "./Cart.css";

const Cart = () => {
  const { cart, getTotalItems } = useCart();
  const totalItems = getTotalItems();

  if (totalItems === 0) {
    return (
      <div className="cart-empty-container">
        <div className="cart-empty-content">
          <h2>🛒 Tu carrito está vacío</h2>
          <p>Parece que no has agregado productos todavía.</p>
          <Link to="/products" className="btn-primary">
            Ver productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-page-header">
        <h1>Tu Carrito de Compras</h1>
        <span className="cart-items-count">{totalItems} productos</span>
      </div>

      <div className="cart-page-content">
        <div className="cart-items-section">
          <Cart />
        </div>

        <div className="cart-summary-section">
          <div className="cart-summary-card">
            <h3>Resumen del Pedido</h3>
            <div className="summary-row">
              <span>Productos ({totalItems})</span>
              <span>${getTotalItems() * 10}</span>{" "}
              {/* Esto debe usar el precio real */}
            </div>
            <div className="summary-row">
              <span>Envío</span>
              <span className="free">Gratis</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-total">
              <span>Total</span>
              <span className="total-price">
                ${/* Aquí irá el total real */}
              </span>
            </div>

            <Link to="/checkout" className="checkout-btn">
              Proceder al Pago
            </Link>

            <Link to="/products" className="continue-shopping">
              ← Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
