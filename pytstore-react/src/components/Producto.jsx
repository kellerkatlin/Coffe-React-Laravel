import { formatearDinero } from "../helpers";
import useTienda from "../hooks/useTienda";

export default function Producto({
  producto,
  botonAgregar = false,
  botonDisponible = false,
}) {
  const { nombre, imagen, precio } = producto;
  const { handleClickModal, handleSetProducto, handleClickProductoAgotado } = useTienda();
  return (
    <div className="border p-3 shadow bg-white">
      <img
        className="w-full"
        src={`/img/${imagen}.jpg`}
        alt={`imagen ${nombre}`}
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold"> {nombre}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatearDinero(precio)}
        </p>
        {botonAgregar && (
          <button
            type="button"
            onClick={() => {
              handleClickModal();
              handleSetProducto(producto);
            }}
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
          >
            Agregar
          </button>
        )}
        {botonDisponible && (
          <button
            type="button"
            onClick={() => handleClickProductoAgotado(producto.id)}
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
          >
            Producto Agotado
          </button>
        )}
      </div>
    </div>
  );
}
