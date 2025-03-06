import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { verifyEmail } from "@/services/authService";

const VerifyEmail = () => {
  const [message, setMessage] = useState("Verificando tu correo...");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setMessage("Enlace de verificación inválido.");
      return;
    }

    const handleVerification = async () => {
      try {
        await verifyEmail(token);
        setMessage("¡Tu correo ha sido verificado correctamente!");
        toast.success("Correo verificado con éxito.", {
          icon: "✅",
          action: {
            label: "Ir al inicio",
            onClick: () => navigate("/"),
          },
        });
      } catch (error) {
        setMessage("No se pudo verificar tu correo. Por favor, intenta nuevamente.");
        console.log(error);
        toast.error("Error al verificar el correo.", {
          icon: "❌",
          action: {
            label: "Reintentar",
            onClick: () => window.location.reload(),
          },
        });
      }
    };

    handleVerification();
  }, [searchParams, navigate]);

  return (
    <div className="mt-8">
      <h1 className="text-3xl font-bold text-center mb-6">Verificación de Correo</h1>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-md mx-auto text-center">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default VerifyEmail;