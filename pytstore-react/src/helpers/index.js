export const formatearDinero = (cantidad) => {
  return cantidad.toLocaleString("es-PE", {
    style: "currency",
    currency: "PEN",
  });
};
