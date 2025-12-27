import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/ProductUtils";
import "./CartItem.css";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(item.quantity);
  const [isRemoving, setIsRemoving] = useState(false);

  const subtotal = item.price * item.quantity;

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(item.id, newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 1;
    if (newQuantity > 0 && newQuantity <= 100) {
      setQuantity(newQuantity);
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    setIsRemoving(true);

    setTimeout(() => {
      removeFromCart(item.id);
    }, 300);
  };

  const getStockClass = () => {
    if (item.stock <= 0) return "stock-out";
    if (item.stock <= 5) return "stock-low";
    return "stock-ok";
  };

  const getStockText = () => {
    if (item.stock <= 0) return "Sin stock";
    if (item.stock <= 5) return `Últimas ${item.stock} unidades`;
    return `${item.stock} disponibles`;
  };

  return (
    <div className={`cart-item ${isRemoving ? "removing" : ""}`}>
      <div className="cart-item-image">
        <img
          src={item.image || "https://via.placeholder.com/100"}
          alt={item.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/100?text=No+Image";
          }}
        />
      </div>

      <div className="cart-item-info">
        <div className="cart-item-header">
          <h3 className="cart-item-title">
            <a href={`/item/${item.id}`}>{item.title}</a>
          </h3>
          <span className={`cart-item-stock ${getStockClass()}`}>
            {getStockText()}
          </span>
        </div>

        <p className="cart-item-description">
          {item.description?.substring(0, 100)}...
        </p>

        <div className="cart-item-category">
          <span className="category-tag">{item.category}</span>
        </div>
      </div>

      <div className="cart-item-price">
        <div className="price-label">Precio unitario</div>
        <div className="price-amount">{formatPrice(item.price)}</div>
        {item.originalPrice && item.originalPrice > item.price && (
          <div className="price-original">
            {formatPrice(item.originalPrice)}
          </div>
        )}
      </div>

      <div className="cart-item-quantity">
        <div className="quantity-label">Cantidad</div>
        <div className="quantity-controls">
          <button
            className="quantity-btn decrement"
            onClick={handleDecrement}
            disabled={quantity <= 1}
            aria-label="Reducir cantidad"
          ></button>

          <input
            type="number"
            min="1"
            max="100"
            value={quantity}
            onChange={handleQuantityChange}
            className="quantity-input"
            aria-label="Cantidad"
          />

          <button
            className="quantity-btn increment"
            onClick={handleIncrement}
            disabled={quantity >= 100}
            aria-label="Aumentar cantidad"
          >
            +
          </button>
        </div>
        <button
          className="quantity-remove"
          onClick={handleRemove}
          aria-label="Eliminar producto"
        >
          Eliminar
        </button>
      </div>

      <div className="cart-item-subtotal">
        <div className="subtotal-label">Subtotal</div>
        <div className="subtotal-amount">{formatPrice(subtotal)}</div>
        <div className="subtotal-details">
          {quantity} × {formatPrice(item.price)}
        </div>
      </div>

      <div className="cart-item-actions-mobile">
        <button
          className="remove-btn-mobile"
          onClick={handleRemove}
          aria-label="Eliminar producto"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default CartItem;
