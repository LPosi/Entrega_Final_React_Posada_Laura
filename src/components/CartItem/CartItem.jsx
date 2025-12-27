// src/components/CartItem/CartItem.jsx
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/productUtils";
import "./CartItem.css";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(item.quantity);
  const [isRemoving, setIsRemoving] = useState(false);

  // Calcular subtotal
  const subtotal = item.price * item.quantity;

  // Manejar incremento de cantidad
  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(item.id, newQuantity);
  };

  // Manejar decremento de cantidad
  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(item.id, newQuantity);
    }
  };

  // Manejar cambio manual de cantidad
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 1;
    if (newQuantity > 0 && newQuantity <= 100) {
      setQuantity(newQuantity);
      updateQuantity(item.id, newQuantity);
    }
  };

  // Manejar eliminación del producto
  const handleRemove = () => {
    setIsRemoving(true);
    // Agregar animación antes de eliminar
    setTimeout(() => {
      removeFromCart(item.id);
    }, 300);
  };

  // Obtener clase de stock
  const getStockClass = () => {
    if (item.stock <= 0) return "stock-out";
    if (item.stock <= 5) return "stock-low";
    return "stock-ok";
  };

  // Obtener texto de stock
  const getStockText = () => {
    if (item.stock <= 0) return "Sin stock";
    if (item.stock <= 5) return `Últimas ${item.stock} unidades`;
    return `${item.stock} disponibles`;
  };

  return (
    <div className={`cart-item ${isRemoving ? "removing" : ""}`}>
      {/* Imagen del producto */}
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

      {/* Información del producto */}
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

      {/* Precio unitario */}
      <div className="cart-item-price">
        <div className="price-label">Precio unitario</div>
        <div className="price-amount">{formatPrice(item.price)}</div>
        {item.originalPrice && item.originalPrice > item.price && (
          <div className="price-original">
            {formatPrice(item.originalPrice)}
          </div>
        )}
      </div>

      {/* Controles de cantidad */}
      <div className="cart-item-quantity">
        <div className="quantity-label">Cantidad</div>
        <div className="quantity-controls">
          <button
            className="quantity-btn decrement"
            onClick={handleDecrement}
            disabled={quantity <= 1}
            aria-label="Reducir cantidad"
          >
            −
          </button>

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

      {/* Subtotal */}
      <div className="cart-item-subtotal">
        <div className="subtotal-label">Subtotal</div>
        <div className="subtotal-amount">{formatPrice(subtotal)}</div>
        <div className="subtotal-details">
          {quantity} × {formatPrice(item.price)}
        </div>
      </div>

      {/* Botón de eliminación móvil */}
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
