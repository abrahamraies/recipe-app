import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { forgotPassword } from "@/services/authService";

const schema = yup.object({
  email: yup
    .string()
    .email("Ingresa un correo válido")
    .required("El correo electrónico es obligatorio"),
});

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { email: string }) => {
    setIsLoading(true);
    setMessage("");
    try {
      await forgotPassword(data.email);
      setMessage("Se ha enviado un enlace de restablecimiento a tu correo.");
      setIsSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Ocurrió un error: ${error.message}`);
      } else {
        setMessage("Ocurrió un error inesperado. Inténtalo de nuevo.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh] sm:h-[70vh] md:h-[60vh] bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200">
          ¿Olvidaste tu contraseña?
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} aria-disabled={isSuccess}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Correo electrónico
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Ingresa tu correo electrónico"
              {...register("email")}
              className="mt-1 w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              disabled={isSuccess}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading || isSuccess}
            className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 disabled:bg-gray-400"
          >
            {isLoading ? "Enviando..." : "Enviar enlace"}
          </Button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              isSuccess ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {!isSuccess && (
          <div className="mt-4 text-center">
            <Link
              to="/login"
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              Volver al inicio de sesión
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;