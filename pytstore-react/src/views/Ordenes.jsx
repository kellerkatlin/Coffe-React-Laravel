import clienteAxios from "../config/axios";
import useSWR from "swr";
import useTienda from "../hooks/useTienda";
import { formatearDinero } from "../helpers";

export default function Ordenes() {
  const token = localStorage.getItem("AUTH_TOKEN");
  const fetcher = () =>
    clienteAxios("/api/pedidos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  const { data, error, isLoading } = useSWR("/api/pedidos", fetcher, {
    refreshInterval: 1000,
  });
  const { handleClickCompletarPedido } = useTienda();
  if (isLoading) return <p>Cargando...</p>;
  console.log(error);
  return (
    <div>
      <h1 className="text-4xl font-black">Ordenes</h1>
      <p className="text-2xl my-10">Aministra las ordenes desde aqui</p>
      <div className="grid grid-cols-2 gap-5">
        {data.data.data.map((pedido) => (
          <div
            key={pedido.id}
            className="p-5 bg-white shadow space-y-2 border-b"
          >
            <p className="text-xl font-bold text-slate-600">
              Contenido del Pedido:
            </p>
            <div className="max-h-50 overflow-auto">
              {pedido.productos.map((producto) => (
                <div
                  key={producto.id}
                  className="border-b border-b-slate-200 last-of-type:border-none py-4"
                >
                  <p className="text-sm">ID: {producto.id}</p>
                  <p>{producto.nombre}</p>
                  <p>
                    Cantidad: {""}
                    <span className="font-bold">{producto.pivot.cantidad}</span>
                  </p>
                </div>
              ))}
            </div>
            <p className="text-lg font-bold text-slate-600">
              Cliente: {""}
              <span className="font-normal">{pedido.user.name}</span>
            </p>
            <p className="text-lg font-bold text-amber-600">
              Total a pagar: {""}
              <span className="font-normal text-slate-600">
                {formatearDinero(pedido.total)}
              </span>
            </p>
            <button
              type="button"
              className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer"
              onClick={() => handleClickCompletarPedido(pedido.id)}
            >
              Completar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
