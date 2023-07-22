import { useEffect } from "react";
import clienteAxios from "../config/axios";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";

export const useAuth = ({ middleware, url }) => {
  const token = localStorage.getItem("AUTH_TOKEN");

  const navigate = useNavigate();

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/user", () =>
    clienteAxios("/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        throw Error(error?.response?.data?.errors);
      })
  );

  const login = async (datos, setErrores) => {
    try {
      const { data } = await clienteAxios.post("/api/login", datos);
      localStorage.setItem("AUTH_TOKEN", data.token);
      setErrores([]);
    } catch (error) {
      setErrores(Object.values(error.response.data.errors));
      await mutate();
    }
  };

  const registro = async (datos, setErrores) => {
    try {
      const { data } = await clienteAxios.post("/api/registro", datos);
      localStorage.setItem("AUTH_TOKEN", data.token);
      setErrores([]);
      await mutate();
    } catch (error) {
      setErrores(Object.values(error.response.data.errors));
    }
  };

  const logout = async () => {
    try {
      await clienteAxios.post("/api/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("AUTH_TOKEN");
      await mutate(undefined);
    } catch (error) {
      throw Error(error?.response?.data?.errors);
    }
  };

  useEffect(() => {
    if (middleware === "guest" && url && user) {
      navigate(url);
    }
    if(middleware === 'guest' && user && user.admin){
      navigate('/admin');
    }
    if (middleware === "admin" && user && !user.admin) {
      navigate("/");
    }
    if (middleware === "auth" && error) {
      navigate("/auth/login");
    }
  }, [user, error, middleware, navigate, url]);

  return {
    login,
    logout,
    registro,
    user,
    error,
  };
};
