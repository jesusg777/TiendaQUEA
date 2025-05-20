import "@google/model-viewer";

const FavoritosPage = ({ favoritos, toggleFavorito }) => {
  return (
    <div className="galeria">
      {favoritos.length === 0 ? (
        <p>No hay productos en favoritos.</p>
      ) : (
        favoritos.map((item) => (
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
            <button onClick={() => toggleFavorito(item)}>
              Quitar de favoritos ❤️
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritosPage;
