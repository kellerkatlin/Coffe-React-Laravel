import useTienda from "../hooks/useTienda";

export default function Categoria({ categoria }) {
  
  const { handleClickCategoria, categoriaActual } = useTienda();
  const { icono, id, nombre } = categoria
  
  const resaltarCategoriaActual = () =>
    categoriaActual.id === id ? "bg-amber-400" : "bg-white";
  return (
    <div
      className={`${resaltarCategoriaActual()} flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer`}
    >
      <img className="w-12" src={`img/icono_${icono}.svg`} alt={nombre} />
      <button
        type="button"
        onClick={() => handleClickCategoria(id)}
        className="text-lg font-bold cursor-pointer truncate ml-2 text-gray-700"
      >
        {nombre}
      </button>
    </div>
  );
}
