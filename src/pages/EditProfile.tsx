import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/hooks/useAppDispatch";
import { updateUser, updateEmail, updatePassword } from "@/services/userService";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { setCredentials } from "@/store/slices/authSlice";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [name, setName] = useState(user?.name || "");
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdateName = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      await updateUser(user.id, { name });
      toast.success("Nombre actualizado correctamente.", {
        icon: "✅",
      });
      dispatch(setCredentials({ user: { ...user, name }, token: null }));
    } catch (err) {
      console.error("Error al actualizar el nombre:", err);
      toast.error("Error al actualizar el nombre.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEmail = async () => {
    if (!user?.id || !newEmail) return;
    setLoading(true);
    try {
      await updateEmail(user.id, { newEmail });
      toast.success("Correo electrónico actualizado correctamente.", {
        icon: "📧",
      });
      dispatch(setCredentials({ user: { ...user, email: newEmail }, token: null }));
    } catch (err) {
      console.error("Error al actualizar el correo electrónico:", err);
      toast.error("Error al actualizar el correo electrónico.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!user?.id || !currentPassword || !newPassword) return;
    setLoading(true);
    try {
      await updatePassword(user.id, { currentPassword, newPassword });
      toast.success("Contraseña actualizada correctamente.", {
        icon: "🔒",
      });

      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      console.error("Error al actualizar la contraseña:", err);
      toast.error("Error al actualizar la contraseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Editar Perfil</h1>


      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-md"
          disabled={loading}
        />
        <Button onClick={handleUpdateName} className="mt-2 w-full" disabled={loading}>
          {loading ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Nuevo Correo Electrónico</label>
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="w-full p-2 border rounded-md"
          disabled={loading}
        />
        <Button onClick={handleUpdateEmail} className="mt-2 w-full" disabled={loading}>
          {loading ? "Guardando..." : "Cambiar Correo Electrónico"}
        </Button>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Contraseña Actual</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full p-2 border rounded-md"
          disabled={loading}
        />
        <label className="block text-gray-700 dark:text-gray-300 mt-2 mb-2">Nueva Contraseña</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border rounded-md"
          disabled={loading}
        />
        <Button onClick={handleUpdatePassword} className="mt-2 w-full" disabled={loading}>
          {loading ? "Guardando..." : "Cambiar Contraseña"}
        </Button>
      </div>

      <div className="mt-4">
        <Button
          onClick={() => navigate("/profile")}
          className="w-full bg-gray-500 hover:bg-gray-600"
        >
          Volver al Perfil
        </Button>
      </div>
    </div>
  );
};

export default EditProfile;