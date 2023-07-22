import { Outlet } from "react-router-dom";
import Modal from "react-modal";
import Sidebar from "../components/Sidebar";
import Resumen from "../components/Resumen";
import useTienda from "../hooks/useTienda";
import ModalProducto from "../components/ModalProducto";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../hooks/useAuth";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "auto", // Ajustar el ancho del modal al 80% del ancho de la pantalla
    maxHeight: "80vh", // Ajustar la altura del modal al 80% del alto de la pantalla
    overflowY: "auto", // Habilitar scroll en caso de que el contenido exceda el tamaño del modal
  },
};

Modal.setAppElement("#root");

export default function Layout() {

  useAuth({middleware: "auth"}); // Si no hay usuario, redirecciona a /login
  const { modal } = useTienda();
  return (
    <>
      <div className="md:flex">
        <Sidebar />
        <main className="flex-1 h-screen overflow-y-scroll p-3 bg-gray-100">
          <Outlet />
        </main>
        <Resumen />
      </div>
  
        <Modal isOpen={modal} style={customStyles}>
          <ModalProducto />
        </Modal>
        <ToastContainer />
    </>
  );
}
