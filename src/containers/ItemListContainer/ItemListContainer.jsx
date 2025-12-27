import { Link } from "react-router-dom";

const mockProducts = [
  { id: 1, name: "Producto 1", price: 100 },
  { id: 2, name: "Producto 2", price: 200 },
  { id: 3, name: "Producto 3", price: 300 },
];

const ItemListContainer = () => {
  return (
    <div>
      <h3>Lista de Productos</h3>
      <ul>
        {mockProducts.map((product) => (
          <li key={product.id}>
            <Link to={`/item/${product.id}`}>
              {product.name} - ${product.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemListContainer;
