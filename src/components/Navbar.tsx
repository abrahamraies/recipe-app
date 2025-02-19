import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const user = useAuth();
  const dispatch = useDispatch();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="bg-background text-foreground p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
        <Link to="/" className="text-2xl font-extrabold text-yellow-400 mb-2 md:mb-0 mr-8">
          🍳 Recipe App
        </Link>
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <Link to="/recipes" className="hover:text-yellow-400 text-lg transition-colors">Recetas</Link>
          {user ? (
            <>
              <Link to="/favorites" className="hover:text-yellow-400">
                Favoritos
              </Link>
              <Link to="/shopping-list" className="hover:text-yellow-400">
                Lista de Compras
              </Link>
              <Link to="/profile" className="hover:text-yellow-400">
                Perfil
              </Link>
              <button
                onClick={() => dispatch(logout())}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-400">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="hover:text-yellow-400">
                Registrarse
              </Link>
            </>
          )}
          <Button
            onClick={toggleDarkMode}
            variant="default"
            className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md"
          >
            {isDarkMode ? "Modo Claro" : "Modo Oscuro"}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
