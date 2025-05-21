import { useState, useEffect } from "react";
import "./HistoryPurchase.css";

const HistoryPurchase = () => {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      const historialKey = `compras_por_usuario_${user}`;
      const historial = JSON.parse(localStorage.getItem(historialKey)) || [];
      // Validamos y limpiamos los datos
      const comprasValidas = historial.filter(
        (compra) =>
          compra &&
          compra.fecha &&
          compra.productos &&
          Array.isArray(compra.productos) &&
          compra.datosComprador
      );
      setCompras(comprasValidas);
    }
  }, []);

  const formatPrice = (price) => {
    return price ? `$${Number(price).toFixed(2)}` : "$0.00";
  };

  return (
    <div className="historial-container">
      <h2>Tu Historial de Compras</h2>
      {compras.length === 0 ? (
        <p>No tienes compras registradas</p>
      ) : (
        <div className="compras-list">
          {compras.map((compra, index) => (
            <div key={index} className="compra-item">
              <h3>Compra del {compra.fecha || "Fecha no disponible"}</h3>
              <p>
                <strong>Total:</strong> {formatPrice(compra.total)}
              </p>

              <h4>Productos:</h4>
              <ul>
                {compra.productos.map((producto, i) => (
                  <li key={i}>
                    {producto.nombre || "Producto"} - {producto.cantidad || 0} x{" "}
                    {formatPrice(producto.precio)}
                  </li>
                ))}
              </ul>

              <div className="compra-datos">
                <p>
                  <strong>Enviado a:</strong>{" "}
                  {compra.datosComprador?.nombre || "Nombre no disponible"}
                </p>
                <p>
                  <strong>Direccion: </strong>
                  {compra.datosComprador?.direccion ||
                    "Dirección no disponible"}
                  <br />
                  <strong>Ciudad: </strong>
                  {compra.datosComprador?.ciudad || "Ciudad no disponible"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPurchase;
