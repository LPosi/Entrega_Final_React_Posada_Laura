import { useState } from "react";
import { filterProducts, sortProducts } from "../../utils/ProductUtils";
import Item from "../Item/Item";
import "./ItemList.css";

const ItemList = ({ products = [] }) => {
  const [sortBy, setSortBy] = useState("default");
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    inStockOnly: false,
    searchQuery: "",
  });

  const filteredProducts = filterProducts(products, filters);
  const sortedProducts = sortProducts(filteredProducts, sortBy);

  const sortOptions = [
    { value: "default", label: "Recomendados" },
    { value: "price-asc", label: "Precio: menor a mayor" },
    { value: "price-desc", label: "Precio: mayor a menor" },
    { value: "name-asc", label: "Nombre: A-Z" },
    { value: "name-desc", label: "Nombre: Z-A" },
    { value: "newest", label: "Más nuevos primero" },
  ];

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
      inStockOnly: false,
      searchQuery: "",
    });
    setSortBy("default");
  };

  if (products.length === 0) {
    return (
      <div className="item-list-empty">
        <div className="empty-icon">📦</div>
        <h3>No hay productos disponibles</h3>
        <p>Pronto agregaremos nuevos productos.</p>
      </div>
    );
  }

  return (
    <div className="item-list-container">
      <div className="list-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={filters.searchQuery}
            onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="quick-filters">
          <button
            className={`filter-btn ${filters.inStockOnly ? "active" : ""}`}
            onClick={() =>
              handleFilterChange("inStockOnly", !filters.inStockOnly)
            }
          >
            {filters.inStockOnly ? "✓ Solo con stock" : "Solo con stock"}
          </button>

          <select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="category-filter"
          >
            <option value="">Todas las categorías</option>
            <option value="electronics">Electrónica</option>
            <option value="clothing">Ropa</option>
            <option value="books">Libros</option>
            <option value="home">Hogar</option>
            <option value="sports">Deportes</option>
          </select>

          <div className="price-filters">
            <input
              type="number"
              placeholder="Mín $"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              className="price-input"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Máx $"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              className="price-input"
            />
          </div>

          <button onClick={resetFilters} className="reset-btn">
            Limpiar filtros
          </button>
        </div>

        <div className="sort-controls">
          <span className="sort-label">Ordenar por:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="results-info">
        <span className="results-count">
          {sortedProducts.length} de {products.length} productos
        </span>
        {filters.searchQuery && (
          <span className="search-term">Buscando: "{filters.searchQuery}"</span>
        )}
      </div>

      {sortedProducts.length > 0 ? (
        <>
          <div className="item-list-grid">
            {sortedProducts.map((product) => (
              <Item key={product.id} product={product} />
            ))}
          </div>

          <div className="pagination">
            <button className="page-btn" disabled>
              ← Anterior
            </button>
            <span className="page-info">Página 1 de 1</span>
            <button className="page-btn" disabled>
              Siguiente →
            </button>
          </div>
        </>
      ) : (
        <div className="no-results">
          <div className="no-results-icon">😞</div>
          <h3>No se encontraron productos</h3>
          <p>Prueba con otros filtros o términos de búsqueda.</p>
          <button onClick={resetFilters} className="reset-search-btn">
            Ver todos los productos
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemList;
