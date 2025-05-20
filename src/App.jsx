import { useEffect, useState } from "react";
import "@google/model-viewer";
import { productos } from "./data";
import { Navbar } from "./components/navbar/Navbar";
import "./App.css";
import { useNavigate, Routes, Route } from "react-router-dom";
import CartPage from "./components/cart_page/CartPage";
import FavoritosPage from "./components/fav_products/FavoritosPage";
import ProductDetail from "./pages/ProductDetail";

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
                    key={item.id}
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
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        agregarAlCarrito(item);
                      }}
                    >
                      Agregar al carrito
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorito(item);
                      }}
                    >
                      {esFavorito(item.id)
                        ? "❤️ Quitar de favoritos"
                        : "🤍 Agregar a favoritos"}
                    </button>
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
            path="/favoritos"
            element={
              <FavoritosPage
                favoritos={favoritos}
                toggleFavorito={toggleFavorito}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
