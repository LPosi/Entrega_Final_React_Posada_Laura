/**
 * Utilidades para productos
 * Funciones para filtrar, ordenar y formatear productos
 */

/**
 * Filtra productos según criterios especificados
 * @param {Array} products - Lista de productos
 * @param {Object} filters - Objeto con filtros a aplicar
 * @returns {Array} Productos filtrados
 */
export const filterProducts = (products, filters) => {
  // Validación de entrada
  if (!products || !Array.isArray(products)) return [];
  if (!filters) return products;

  return products.filter((product) => {
    if (!product) return false;

    // Filtro por categoría
    const matchesCategory =
      !filters.category ||
      filters.category === "all" ||
      (product.category && product.category === filters.category);

    // Filtro por precio mínimo
    const matchesMinPrice =
      !filters.minPrice ||
      filters.minPrice === "" ||
      (product.price && product.price >= Number(filters.minPrice));

    // Filtro por precio máximo
    const matchesMaxPrice =
      !filters.maxPrice ||
      filters.maxPrice === "" ||
      (product.price && product.price <= Number(filters.maxPrice));

    // Filtro por disponibilidad en stock
    const matchesStock =
      !filters.inStockOnly ||
      filters.inStockOnly === false ||
      (product.stock && product.stock > 0);

    // Filtro por búsqueda de texto
    const matchesSearch =
      !filters.searchQuery ||
      filters.searchQuery.trim() === "" ||
      (product.title &&
        product.title
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase())) ||
      (product.description &&
        product.description
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase())) ||
      (product.category &&
        product.category
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase()));

    // Todos los filtros deben coincidir
    return (
      matchesCategory &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesStock &&
      matchesSearch
    );
  });
};

/**
 * Ordena productos según criterio especificado
 * @param {Array} products - Lista de productos
 * @param {string} sortBy - Criterio de ordenamiento
 * @returns {Array} Productos ordenados
 */
export const sortProducts = (products, sortBy) => {
  // Validación de entrada
  if (!products || !Array.isArray(products)) return [];
  if (!sortBy) return [...products];

  // Crear copia para no mutar el array original
  const sorted = [...products].filter((product) => product && product.title);

  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => {
        const priceA = a.price || 0;
        const priceB = b.price || 0;
        return priceA - priceB;
      });

    case "price-desc":
      return sorted.sort((a, b) => {
        const priceA = a.price || 0;
        const priceB = b.price || 0;
        return priceB - priceA;
      });

    case "name-asc":
      return sorted.sort((a, b) => {
        const titleA = a.title || "";
        const titleB = b.title || "";
        return titleA.localeCompare(titleB);
      });

    case "name-desc":
      return sorted.sort((a, b) => {
        const titleA = a.title || "";
        const titleB = b.title || "";
        return titleB.localeCompare(titleA);
      });

    case "newest":
      return sorted.sort((a, b) => {
        const dateA = new Date(a.createdAt || "1970-01-01");
        const dateB = new Date(b.createdAt || "1970-01-01");
        return dateB - dateA;
      });

    case "oldest":
      return sorted.sort((a, b) => {
        const dateA = new Date(a.createdAt || "1970-01-01");
        const dateB = new Date(b.createdAt || "1970-01-01");
        return dateA - dateB;
      });

    default:
      return sorted;
  }
};

/**
 * Formatea un precio numérico a string con formato de moneda
 * @param {number|string} price - Precio a formatear
 * @param {string} currency - Símbolo de moneda (default: "$")
 * @returns {string} Precio formateado
 */
export const formatPrice = (price, currency = "$") => {
  // Validación y conversión a número
  if (price === null || price === undefined) {
    return `${currency}0.00`;
  }

  let numericPrice;

  if (typeof price === "string") {
    // Remover símbolos de moneda y espacios
    const cleanedPrice = price.replace(/[^\d.,-]/g, "");
    numericPrice = parseFloat(cleanedPrice.replace(",", ".")) || 0;
  } else if (typeof price === "number") {
    numericPrice = price;
  } else {
    numericPrice = 0;
  }

  // Asegurar que sea un número válido
  if (isNaN(numericPrice) || !isFinite(numericPrice)) {
    numericPrice = 0;
  }

  // Redondear a 2 decimales
  const roundedPrice = Math.round(numericPrice * 100) / 100;

  // Formatear con separadores de miles
  const parts = roundedPrice.toFixed(2).split(".");
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `${currency}${integerPart}.${parts[1]}`;
};

/**
 * Calcula el total de un carrito de compras
 * @param {Array} cartItems - Items del carrito
 * @returns {number} Total calculado
 */
export const calculateCartTotal = (cartItems) => {
  if (!cartItems || !Array.isArray(cartItems)) return 0;

  return cartItems.reduce((total, item) => {
    if (!item) return total;
    const price = item.price || 0;
    const quantity = item.quantity || 1;
    return total + price * quantity;
  }, 0);
};

/**
 * Aplica descuento a un precio
 * @param {number} price - Precio original
 * @param {number} discountPercentage - Porcentaje de descuento
 * @returns {number} Precio con descuento
 */
export const applyDiscount = (price, discountPercentage) => {
  const numericPrice = parseFloat(price) || 0;
  const numericDiscount = parseFloat(discountPercentage) || 0;

  if (numericDiscount <= 0) return numericPrice;
  if (numericDiscount >= 100) return 0;

  return numericPrice * (1 - numericDiscount / 100);
};

// Exportación por defecto para facilitar imports
const ProductUtils = {
  filterProducts,
  sortProducts,
  formatPrice,
  calculateCartTotal,
  applyDiscount,
};

export default ProductUtils;
