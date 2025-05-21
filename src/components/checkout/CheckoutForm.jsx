import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CheckoutForm.css";

const CheckoutForm = ({ carrito, setCarrito }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    telefono: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const fecha = new Date().toLocaleString();
      const numeroFactura = `FAC-${Math.floor(Math.random() * 10000) + 1000}`;
      const subtotal = carrito.reduce(
        (acc, item) => acc + item.precio * item.cantidad,
        0
      );
      const iva = subtotal * 0.19;
      const total = subtotal + iva;

      const compra = {
        datosComprador: formData,
        productos: [...carrito],
        fecha,
        subtotal, // Añadido
        iva, // Añadido
        total,
        numeroFactura,
      };

      const user = localStorage.getItem("currentUser");
      const historialKey = `compras_por_usuario_${user}`;
      const historial = JSON.parse(localStorage.getItem(historialKey)) || [];
      historial.unshift(compra);
      localStorage.setItem(historialKey, JSON.stringify(historial));

      setCarrito([]);
      localStorage.setItem("carrito", JSON.stringify([]));

      navigate("/factura", {
        state: {
          datos: formData,
          carrito,
          numeroFactura,
          subtotal, // Añadido
          iva, // Añadido
        },
      });
    } catch (error) {
      console.error("Error en el checkout:", error);
      alert("Ocurrió un error al procesar tu compra");
    }
  };

  return (
    <div className="checkout-container">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>Datos de Envío</h2>
        <div className="form-group">
          <label>
            Nombre completo:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Dirección:
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Ciudad:
            <input
              type="text"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Teléfono:
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit" className="submit-btn">
          Generar Factura
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
