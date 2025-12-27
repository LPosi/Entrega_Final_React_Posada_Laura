export const formatPrice = (price, currency = "USD") => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
};

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

export const filterProducts = (products, filters = {}) => {
  return products.filter((product) => {
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    if (filters.minPrice && product.price < filters.minPrice) {
      return false;
    }

    if (filters.maxPrice && product.price > filters.maxPrice) {
      return false;
    }

    if (filters.inStockOnly && product.stock <= 0) {
      return false;
    }

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

export const sortProducts = (products, sortBy = "default") => {
  const sorted = [...products];

  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);

    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);

    case "name-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.name));

    case "name-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.name));

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

export const calculateAverageRating = (reviews = []) => {
  if (!reviews.length) return 0;

  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};

export const generateId = (length = 8) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
};
