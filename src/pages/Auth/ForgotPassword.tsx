import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { forgotPassword } from "@/services/authService";
import { toast } from "sonner";

const ErrorMessage = ({ message }: { message: string | undefined }) => (
  <p className="text-red-500 text-sm mt-1">{message}</p>
);

const ForgotPassword = () => {
  const [state, setState] = useState({
    isLoading: false,
    message: "",
    isSuccess: false,
  });

  const schema = yup.object().shape({
    email: yup.string()
      .email("Ingresa un correo válido")
      .required("El correo electrónico es obligatorio"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { email: string }) => {
    setState((prev) => ({ ...prev, isLoading: true, message: "" }));
    try {
      await forgotPassword(data.email);
      setState((prev) => ({
        ...prev,
        message: "Se ha enviado un enlace de restablecimiento a tu correo.",
        isSuccess: true,
      }));
      toast.success("Correo enviado correctamente.", {
        icon: "📧",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Ocurrió un error inesperado.";
      setState((prev) => ({ ...prev, message: `Error: ${errorMessage}` }));
      toast.error("No se pudo enviar el correo. Inténtalo de nuevo.");
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh] sm:h-[70vh] md:h-[60vh] bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200">
          ¿Olvidaste tu contraseña?
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} aria-disabled={state.isSuccess}>
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
              disabled={state.isSuccess}
            />
            {errors.email && <ErrorMessage message={errors.email.message} />}
          </div>
          <Button
            type="submit"
            disabled={state.isLoading || state.isSuccess}
            className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 disabled:bg-gray-400"
          >
            {state.isLoading ? "Enviando..." : "Enviar enlace"}
          </Button>
        </form>

        {state.message && (
          <p
            className={`mt-4 text-center text-sm ${
              state.isSuccess ? "text-green-600" : "text-red-500"
            }`}
          >
            {state.message}
          </p>
        )}

        {!state.isSuccess && (
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