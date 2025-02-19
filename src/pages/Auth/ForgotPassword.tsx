import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { forgotPassword } from "@/services/authService";


const schema = yup.object({
  email: yup.string().email("Ingresa un correo válido").required("El correo electrónico es obligatorio"),
});

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { email: string }) => {
    setIsLoading(true);
    try {
      await forgotPassword(data.email);
      setMessage("Se ha enviado un enlace de restablecimiento a tu correo.");
    } catch (error) {
      setMessage("Ocurrió un error. Inténtalo de nuevo. " + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh] sm:h-[70vh] md:h-[60vh] bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <h2 className="mb-6 text-2xl font-bold">¿Olvidaste tu contraseña?</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Input
            type="email"
            placeholder="Correo electrónico"
            {...register("email")}
            className="w-full border p-2 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <Button type="submit" disabled={isLoading} className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            {isLoading ? "Enviando..." : "Enviar enlace"}
          </Button>
        </form>
        {message && <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">{message}</p>}
        <div className="mt-4 text-center">
          <Link to="/login" className="text-sm text-blue-600 hover:underline">
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;