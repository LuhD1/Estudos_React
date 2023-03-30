import { Navigate, Outlet } from "react-router-dom";
import { Menu } from "../../components/Menu/Menu";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

export function Root() {
  const usuarioLogado = useContext(AuthContext)

  if (usuarioLogado === null) {
    return <Navigate to="/login"/>
  }

  return (
    <>
      <header>
        <Menu />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
