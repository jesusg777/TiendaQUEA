import "./Carrito.css";

export function Carrito({ carrito, setCarrito }) {
  const modificarCantidad = (id, cantidad) => {
    if (cantidad < 1) return;
    setCarrito((prev) =>
      prev.map((item) => (item.id === id ? { ...item, cantidad } : item))
    );
  };

  const remover = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  const subtotal = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );
  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  return (
    <div className="carrito">
      <h2>🛒 Carrito</h2>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <ul>
            {carrito.map((item) => (
              <li key={item.id} style={{ marginBottom: "1rem" }}>
                <strong>{item.nombre}</strong>
                <br />
                Precio: ${item.precio} <br />
                <div className="cantidad-group">
                  <span>Cantidad:</span>
                  <input
                    type="number"
                    value={item.cantidad}
                    min="1"
                    onChange={(e) =>
                      modificarCantidad(item.id, parseInt(e.target.value))
                    }
                    style={{ width: "60px", margin: "0 10px" }}
                  />
                </div>
                Subtotal: ${item.precio * item.cantidad}
                <button onClick={() => remover(item.id)}>❌</button>
              </li>
            ))}
          </ul>
          <hr />
          <p>
            <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
          </p>
          <p>
            <strong>IVA (19%):</strong> ${iva.toFixed(2)}
          </p>
          <h3>
            <strong>Total:</strong> ${total.toFixed(2)}
          </h3>
        </>
      )}
    </div>
  );
}
