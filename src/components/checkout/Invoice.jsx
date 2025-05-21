import { useTheme } from "../../context/ThemeContext";
import "./Invoice.css";

const Invoice = ({ datos, carrito, numeroFactura }) => {
  const { isDark } = useTheme();
  const subtotal = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );
  const iva = subtotal * 0.19;
  const total = subtotal + iva;
  const fecha = new Date().toLocaleString();

  return (
    <div className={`invoice-container ${isDark ? "dark" : "light"}`}>
      <div className="invoice-header">
        <div>
          <h2>Factura de Compra</h2>
          <p className="invoice-number">N° FACTURA: {numeroFactura}</p>
        </div>
      </div>

      <div className="customer-info">
        <h3>Datos del Cliente</h3>
        <p>
          <strong>Nombre:</strong> {datos.nombre}
        </p>
        <p>
          <strong>Dirección:</strong> {datos.direccion}
        </p>
        <p>
          <strong>Ciudad:</strong> {datos.ciudad}
        </p>
        <p>
          <strong>Teléfono:</strong> {datos.telefono}
        </p>
        <p>
          <strong>Fecha:</strong> {fecha}
        </p>
      </div>

      <h3>Detalle de la Compra</h3>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((item) => (
            <tr key={item.id}>
              <td>{item.nombre}</td>
              <td>{item.cantidad}</td>
              <td>${item.precio.toFixed(2)}</td>
              <td>${(item.precio * item.cantidad).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="totales">
        <p>
          <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
        </p>
        <p>
          <strong>IVA (19%):</strong> ${iva.toFixed(2)}
        </p>
        <p>
          <strong>Total a Pagar:</strong> ${total.toFixed(2)}
        </p>
      </div>

      <div className="payment-info">
        <h3>Información de Pago</h3>
        <p>
          <strong>Método de Pago:</strong> Transferencia Bancaria
        </p>
        <p>
          <strong>Cuenta Bancaria:</strong> 1234-5678-9012-3456
        </p>
        <p>
          <strong>Banco:</strong> Bancolombia
        </p>
        <p>
          <strong>Titular:</strong> Tienda 3D
        </p>
      </div>

      <div className="invoice-footer">
        <p>Gracias por su compra</p>
        <p>Para consultas, contacte a jdgelvesc@correo.usbcali.edu.co</p>
        <p>Teléfono: +57 123 456 7890</p>
      </div>
    </div>
  );
};

export default Invoice;
