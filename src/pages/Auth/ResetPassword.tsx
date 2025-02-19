import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "@/services/authService";

const schema = yup.object({
  password: yup.string().min(8, "La contraseña debe tener al menos 8 caracteres").required("La contraseña es requerida"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
    .required("Confirma tu contraseña"),
});

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { email } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ password: string; confirmPassword: string }>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await resetPassword(email!);
      setMessage(response.data.message || "Contraseña restablecida correctamente.");
      setTimeout(() => navigate("/login"), 4000);
    } catch (error) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as { response: { data: { message: string } } };
        setMessage(axiosError.response?.data?.message || "Error al restablecer la contraseña.");
      } else {
        setMessage("Ocurrió un error inesperado.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh] sm:h-[70vh] md:h-[60vh] bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <h2 className="mb-6 text-2xl font-bold">Restablecer contraseña</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Nueva Contraseña</label>
          <Input
            type="password"
            placeholder="Nueva contraseña"
            {...register("password")}
            className="w-full border p-2 rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Confirmar Contraseña</label>
          <Input
            type="password"
            placeholder="Confirmar contraseña"
            {...register("confirmPassword")}
            className="w-full border p-2 rounded"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>
          <Button type="submit" disabled={isLoading} className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            {isLoading ? "Restableciendo..." : "Restablecer contraseña"}
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

export default ResetPassword;