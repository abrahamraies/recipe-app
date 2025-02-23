import { useAppDispatch } from "@/hooks/useAppDispatch";
import { loginAsync } from "@/store/thunks/authThunks";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const credentials = {
      email: "admin@example.com",
      password: "1234567",
    };
  
    try {
      await dispatch(loginAsync(credentials)).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh] sm:h-[70vh] md:h-[60vh] bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Ingresa tu email"
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Contraseña</label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              className="w-full border p-2 rounded"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;