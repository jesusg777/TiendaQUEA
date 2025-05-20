import { Carrito } from "../../Carrito";

const CartPage = ({ carrito, setCarrito }) => {
  return (
    <div className="cart-page">
      <h2>Tu Carrito de Compras</h2>
      <Carrito carrito={carrito} setCarrito={setCarrito} />
    </div>
  );
};

export default CartPage;
