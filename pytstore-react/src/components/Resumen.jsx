import { formatearDinero } from "../helpers";
import useTienda from "../hooks/useTienda";
import ResumenProducto from "./ResumenProducto";

export default function Resumen() {
  const { pedido, total, handleSubmitNuevaOrden } = useTienda();
  const comprobarPedido = () => pedido.length === 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitNuevaOrden();
  };
  return (
    <aside className="w-72 h-screen overflow-y-scroll p-5">
      <h1 className="text-4xl font-black">Carrito de compras</h1>
      <p className="text-lg my-5">
        Ver los productos que has agregado al carrito de compras
      </p>
      <div className="py-10">
        {pedido.length === 0 ? (
          <p className="text-center text-2xl">No hay productos</p>
        ) : (
          pedido.map((producto) => (
            <ResumenProducto key={producto.id} producto={producto} />
          ))
        )}
      </div>
      <p className="text-xl mt-10">
        Total: {""} {formatearDinero(total)}
      </p>

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mt-5">
          <input
            type="submit"
            className={`${
              comprobarPedido()
                ? "bg-indigo-100"
                : "bg-indigo-600 hover:bg-indigo-800"
            } px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer`}
            value="Confirmar Pedido"
            disabled={comprobarPedido()}
          />
        </div>
      </form>
    </aside>
  );
}
