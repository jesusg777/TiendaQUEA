import { useEffect, useState } from "react";
import "@google/model-viewer";
import { productos } from "./data";
import { Navbar } from "./components/navbar/Navbar";
import "./App.css";
import { useNavigate, Routes, Route } from "react-router-dom";
import CartPage from "./components/cart_page/CartPage";

function App() {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      navigate("/login");
    }
  }, [navigate]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  return (
    <div className="app">
      <Navbar carrito={carrito} />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <div className="galeria">
                {productos.map((item) => (
                  <div key={item.id} className="producto">
                    <model-viewer
                      src={item.modelo}
                      alt={item.nombre}
                      auto-rotate
                      camera-controls
                      ar
                      style={{ width: "250px", height: "250px" }}
                    />
                    <h2>{item.nombre}</h2>
                    <p>${item.precio}</p>
                    <button onClick={() => agregarAlCarrito(item)}>
                      Agregar al carrito
                    </button>
                  </div>
                ))}
              </div>
            }
          />
          <Route
            path="/cart"
            element={<CartPage carrito={carrito} setCarrito={setCarrito} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
