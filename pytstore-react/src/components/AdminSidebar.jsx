import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AdminSidebar() {
  const { logout } = useAuth({ middleware: "auth" });
  return (
    <aside className="md:w-72 h-screen">
      <div className="p-4">
        <img className="w-40" src="/img/logo.svg" alt="Imagen Logotipo" />
      </div>
      <nav className="flex flex-col p-4">
        <Link to="/admin" className="font-bold text-lg">
          Ordenes
        </Link>
        <Link to="/admin/productos" className="font-bold text-lg">
          productos
        </Link>
      </nav>
      <div className="my-5 px-5">
        <button
          type="button"
          className="text-center bg-red-500 w-full p-3 font-bold text-white truncate"
          onClick={logout}
        >
          Cerrar Sesion
        </button>
      </div>
    </aside>
  );
}
