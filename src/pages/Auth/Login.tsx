import { useAppDispatch } from "@/hooks/useAppDispatch";
import { loginAsync } from "@/store/thunks/authThunks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ErrorMessage = ({ message }: { message: string | undefined }) => (
  <p className="text-red-500 text-sm mt-1">{message}</p>
);

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const validationSchema = yup.object().shape({
    email: yup.string()
      .email("El correo electrónico no es válido")
      .required("El correo electrónico es obligatorio"),
    password: yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({
    resolver: yupResolver(validationSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsSubmitting(true);
    try {
      await dispatch(loginAsync(data)).unwrap();
      toast.success("Inicio de sesión exitoso. ¡Bienvenido!", {
        icon: "🎉",
      });
      navigate("/");
    } catch (error) {
      toast.error("Credenciales incorrectas o hubo un error al iniciar sesión.");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh] sm:h-[70vh] md:h-[60vh] bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Ingresa tu email"
              {...register("email")}
              className={`w-full border p-2 rounded ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <ErrorMessage message={errors.email.message} />}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Contraseña</label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              {...register("password")}
              className={`w-full border p-2 rounded ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <ErrorMessage message={errors.password.message} />
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors disabled:bg-gray-400"
          >
            {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-yellow-500 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;