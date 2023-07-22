import { useContext } from "react";
import { TiendaContext } from "../context/TiendaProvider";

const useTienda = () => { 
    return useContext(TiendaContext);
}

export default useTienda;