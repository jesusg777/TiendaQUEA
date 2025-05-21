import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import "./HistoryPurchase.css";

const HistoryPurchase = () => {
  const { isDark } = useTheme();
  const [compras, setCompras] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      const historialKey = `compras_por_usuario_${user}`;
      const historial = JSON.parse(localStorage.getItem(historialKey)) || [];
      setCompras(historial);
    }
  }, []);

  const verFactura = (compra) => {
    navigate("/factura", {
      state: {
        datos: compra.datosComprador,
        carrito: compra.productos,
        numeroFactura: compra.numeroFactura,
        subtotal: compra.subtotal,
        iva: compra.iva,
      },
    });
  };

  return (
    <div className={`historial-container ${isDark ? "dark" : "light"}`}>
      <h2>Tu Historial de Compras</h2>
      {compras.length === 0 ? (
        <p>No tienes compras registradas</p>
      ) : (
        <div className="compras-list">
          {compras.map((compra, index) => (
            <div key={index} className="compra-item">
              <h3>Compra del {compra.fecha}</h3>
              <p>
                <strong>N° Factura:</strong> {compra.numeroFactura}
              </p>
              <p>
                <strong>Subtotal:</strong> $
                {compra.subtotal?.toFixed(2) || "0.00"}
              </p>
              <p>
                <strong>IVA (19%):</strong> ${compra.iva?.toFixed(2) || "0.00"}
              </p>
              <p>
                <strong>Total:</strong> ${compra.total?.toFixed(2) || "0.00"}
              </p>

              <button
                onClick={() => verFactura(compra)}
                className="ver-factura-btn"
              >
                Ver Factura
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPurchase;
