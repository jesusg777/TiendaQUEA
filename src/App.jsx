import { useEffect, useState } from "react";
import "@google/model-viewer";
import { productos } from "./data";
import { Navbar } from "./components/navbar/Navbar";
import "./App.css";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import CartPage from "./components/cart_page/CartPage";
import FavoritosPage from "./components/fav_products/FavoritosPage";
import ProductDetail from "./pages/ProductDetail";
import CheckoutForm from "./components/checkout/CheckoutForm";
import Invoice from "./components/checkout/Invoice";
import HistoryPurchase from "./components/history_purchase/HistoryPurchase";

function InvoicePage() {
  const { state } = useLocation();
  if (!state || !state.datos || !state.carrito) {
    return <p>No hay datos para mostrar la factura.</p>;
  }
  return (
    <Invoice
      datos={state.datos}
      carrito={state.carrito}
      numeroFactura={
        state.numeroFactura || `FAC-${Math.floor(Math.random() * 10000) + 1000}`
      }
    />
  );
}

function App() {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  const [favoritos, setFavoritos] = useState(() => {
    const favoritosGuardados = localStorage.getItem("favoritos");
    return favoritosGuardados ? JSON.parse(favoritosGuardados) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

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

  const toggleFavorito = (producto) => {
    setFavoritos((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.filter((item) => item.id !== producto.id);
      } else {
        return [...prev, producto];
      }
    });
  };

  const esFavorito = (productoId) => {
    return favoritos.some((item) => item.id === productoId);
  };

  return (
    <div className="app">
      <Navbar carrito={carrito} favoritos={favoritos} />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <div className="galeria">
                {productos.map((item) => (
                  <div
                    className="producto"
                    onClick={() => navigate(`/producto/${item.id}`)}
                  >
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
                    <div className="producto-botones">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          agregarAlCarrito(item);
                        }}
                      >
                        🛒 Agregar al carrito
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorito(item);
                        }}
                      >
                        {esFavorito(item.id)
                          ? "🤍 Quitar favoritos"
                          : "❤️ Agregar a favoritos"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            }
          />
          <Route
            path="/producto/:id"
            element={
              <ProductDetail
                agregarAlCarrito={agregarAlCarrito}
                agregarAFavoritos={toggleFavorito}
              />
            }
          />
          <Route
            path="/cart"
            element={<CartPage carrito={carrito} setCarrito={setCarrito} />}
          />
          <Route
            path="/formulario"
            element={<CheckoutForm carrito={carrito} setCarrito={setCarrito} />}
          />

          <Route
            path="/favoritos"
            element={
              <FavoritosPage
                favoritos={favoritos}
                toggleFavorito={toggleFavorito}
              />
            }
          />
          <Route path="/factura" element={<InvoicePage />} />
          <Route path="/historial" element={<HistoryPurchase />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
