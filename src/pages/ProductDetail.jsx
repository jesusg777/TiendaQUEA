import { useParams } from "react-router-dom";
import "@google/model-viewer";
import { productos } from "../data";
import "./ProductDetail.css";

const ProductDetail = ({ agregarAlCarrito, agregarAFavoritos }) => {
  const { id } = useParams();
  const producto = productos.find((p) => p.id.toString() === id);

  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <div className="detalle-producto">
      <div className="producto-modelo">
        <model-viewer
          src={producto.modelo}
          alt={producto.nombre}
          auto-rotate
          camera-controls
          ar
        />
      </div>
      <div className="producto-info">
        <h2>{producto.nombre}</h2>
        <p>{producto.descripcion}</p>
        <p>
          <strong>${producto.precio}</strong>
        </p>
        <div className="botones">
          <button onClick={() => agregarAlCarrito(producto)}>🛒 Comprar</button>
          <button onClick={() => agregarAFavoritos(producto)}>
            ❤️ Favorito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
