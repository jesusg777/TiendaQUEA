import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "@google/model-viewer";
import { productos } from "../data";
import "./ProductDetail.css";

const ProductDetail = ({ agregarAlCarrito, agregarAFavoritos, favoritos }) => {
  const { id } = useParams();
  const producto = productos.find((p) => p.id.toString() === id);
  const [esFavorito, setEsFavorito] = useState(false);

  useEffect(() => {
    setEsFavorito(favoritos.some((item) => item.id.toString() === id));
  }, [favoritos, id]);

  if (!producto) return <p>Producto no encontrado</p>;

  const manejarFavorito = () => {
    agregarAFavoritos(producto);
    setEsFavorito(!esFavorito);
  };

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
          <button onClick={() => agregarAlCarrito(producto)}>
            🛒 Agregar al carrito
          </button>
          <button onClick={manejarFavorito}>
            {esFavorito ? "🤍 Quitar favoritos" : "❤️ Agregar a favoritos"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
