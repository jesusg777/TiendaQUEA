import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export const Navbar = ({ carrito, favoritos }) => {
  const { isDark, toggleTheme } = useTheme();
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("currentUser")
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/login");
    setShowDropdown(false);
  };

  const goToCart = () => {
    navigate("/cart");
  };

  const goToHome = () => {
    navigate("/");
  };

  const goToFavoritos = () => {
    navigate("/favoritos");
  };

  const goToHistorial = () => {
    navigate("/historial");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showDropdown && !e.target.closest(".user-dropdown")) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <h1 onClick={goToHome} style={{ cursor: "pointer" }}>
          Tienda 3D
        </h1>
      </div>

      <div className="navbar-actions">
        {/* Historial de Compras */}
        <div className="icon-button-container">
          <div className="icon-button" onClick={goToHistorial}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon-svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
              />
            </svg>
            <span className="tooltip">Historial</span>
          </div>
        </div>

        {/* Carrito */}
        <div className="icon-button-container">
          <div className="icon-button" onClick={goToCart}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon-svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            {carrito.length > 0 && (
              <span className="cart-badge">{carrito.length}</span>
            )}
            <span className="tooltip">Carrito</span>
          </div>
        </div>

        {/* Favoritos */}
        <div className="icon-button-container">
          <div className="icon-button" onClick={goToFavoritos}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon-svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            {favoritos.length > 0 && (
              <span className="favorites-badge">{favoritos.length}</span>
            )}
            <span className="tooltip">Favoritos</span>
          </div>
        </div>

        {/* Tema claro/oscuro */}
        <div className="icon-button-container">
          <button
            onClick={toggleTheme}
            className="icon-button"
            aria-label={
              isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"
            }
          >
            {isDark ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon-svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon-svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            )}
            <span className="tooltip">
              {isDark ? "Tema claro" : "Tema oscuro"}
            </span>
          </button>
        </div>

        {/* Usuario */}
        {currentUser ? (
          <div className="icon-button-container">
            <div className="user-dropdown">
              <button
                className={`user-button ${showDropdown ? "active" : ""}`}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {currentUser} <span className="dropdown-icon">▼</span>
                <span className="tooltip">Mi cuenta</span>
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  <button className="dropdown-item" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <a href="/login" className="login-button">
            Iniciar Sesión
          </a>
        )}
      </div>
    </header>
  );
};
