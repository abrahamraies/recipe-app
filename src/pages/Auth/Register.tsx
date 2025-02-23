import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { registerAsync } from "@/store/thunks/authThunks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { RegisterUserDto } from "@/types/auth";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es obligatorio"),
    email: Yup.string()
      .email("El correo electrónico no es válido")
      .required("El correo electrónico es obligatorio"),
    passwordHash: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: RegisterUserDto) => {
    try {
      await dispatch(registerAsync(data)).unwrap();
      toast.success("Registro exitoso. ¡Bienvenido!");
      navigate("/login");
    } catch (error) {
      toast.error("Error al registrarse. Por favor, intenta de nuevo. "+ error);
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh] sm:h-[70vh] md:h-[60vh] bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-yellow-500">Registro</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Ingresa tu nombre"
              {...register("name")}
              className={`w-full border p-2 rounded ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              placeholder="Ingresa tu email"
              {...register("email")}
              className={`w-full border p-2 rounded ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              {...register("passwordHash")}
              className={`w-full border p-2 rounded ${
                errors.passwordHash ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.passwordHash && (
              <p className="text-red-500 text-sm mt-1">{errors.passwordHash.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
          >
            Registrarse
          </button>
        </form>
        <p className="text-center text-gray-600 dark:text-gray-400">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-yellow-500 hover:underline">
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;