import clienteAxios from "../config/axios";
import useSWR from "swr";

export default function Ordenes() {
  const token = localStorage.getItem("AUTH_TOKEN");
  const fetcher = () =>
    clienteAxios("/api/pedidos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  const { data, error, isLoading } = useSWR("/api/pedidos", fetcher, {
  });
  console.log(data?.data);
  console.log(error);
  console.log(isLoading);
  return (
    <div>
      <h1 className="text-4xl font-black">Ordenes</h1>
      <p className="text-2xl my-10">Aministra las ordenes desde aqui</p>
    </div>
  );
}
