/**
 * Formatea un precio a formato monetario
 * @param {number} price - Precio a formatear
 * @param {string} currency - Código de moneda (USD, EUR, etc.)
 * @returns {string} Precio formateado
 */
export const formatPrice = (price, currency = "USD") => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
};

/**
 * Calcula el descuento aplicado a un producto
 * @param {number} originalPrice - Precio original
 * @param {number} salePrice - Precio con descuento
 * @returns {object} Objeto con porcentaje y monto de descuento
 */
export const calculateDiscount = (originalPrice, salePrice) => {
  if (salePrice >= originalPrice) {
    return { percentage: 0, amount: 0 };
  }

  const discountAmount = originalPrice - salePrice;
  const discountPercentage = Math.round((discountAmount / originalPrice) * 100);

  return {
    percentage: discountPercentage,
    amount: discountAmount,
  };
};

/**
 * Filtra productos por múltiples criterios
 * @param {Array} products - Lista de productos
 * @param {Object} filters - Objeto con filtros
 * @returns {Array} Productos filtrados
 */
export const filterProducts = (products, filters = {}) => {
  return products.filter((product) => {
    // Filtrar por categoría
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    // Filtrar por rango de precio
    if (filters.minPrice && product.price < filters.minPrice) {
      return false;
    }

    if (filters.maxPrice && product.price > filters.maxPrice) {
      return false;
    }

    // Filtrar por stock
    if (filters.inStockOnly && product.stock <= 0) {
      return false;
    }

    // Filtrar por búsqueda de texto
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const titleMatch = product.title.toLowerCase().includes(query);
      const descMatch = product.description.toLowerCase().includes(query);
      const categoryMatch = product.category.toLowerCase().includes(query);

      if (!(titleMatch || descMatch || categoryMatch)) {
        return false;
      }
    }

    return true;
  });
};

/**
 * Ordena productos por diferentes criterios
 * @param {Array} products - Lista de productos
 * @param {string} sortBy - Criterio de ordenamiento
 * @returns {Array} Productos ordenados
 */
export const sortProducts = (products, sortBy = "default") => {
  const sorted = [...products];

  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);

    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);

    case "name-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    case "name-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));

    case "newest":
      return sorted.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

    case "popular":
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    default:
      return sorted;
  }
};

/**
 * Calcula el rating promedio de un producto
 * @param {Array} reviews - Lista de reseñas
 * @returns {number} Rating promedio (0-5)
 */
export const calculateAverageRating = (reviews = []) => {
  if (!reviews.length) return 0;

  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};

/**
 * Genera un identificador único
 * @param {number} length - Longitud del ID
 * @returns {string} ID único
 */
export const generateId = (length = 8) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
};
