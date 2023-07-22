import useSWR from "swr";
import Producto from "../components/Producto";
import useTienda from "../hooks/useTienda";
import clienteAxios from "../config/axios";

export default function Inicio() {
  const { categoriaActual } = useTienda();

  const fetcher = () =>
    clienteAxios("/api/productos").then((data) => data.data);

  const { data, error, isLoading } = useSWR("/api/productos", fetcher, {
    refreshInterval: 1000,
  });
  if (isLoading) return <p>Cargando...</p>;

  const productos = data.data.filter(
    (producto) => producto.categoria_id === categoriaActual.id
  );

  return (
    <>
     
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {productos.map((producto) => (
          <Producto key={producto.imagen} producto={producto} />
        ))}
      </div>
    </>
  );
}
