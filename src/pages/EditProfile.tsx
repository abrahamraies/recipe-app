import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppDispatch";
import { updateUser, updateEmail, updatePassword } from "@/services/userService";
import { Button } from "@/components/ui/button";

const EditProfile = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const [name, setName] = useState(user?.name || "");
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateName = async () => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    try {
      await updateUser(user.id, { name });
      alert("Nombre actualizado correctamente");
    } catch (err) {
      setError("Error al actualizar el nombre");
      console.error("Error al actualizar el nombre:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEmail = async () => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    try {
      await updateEmail(user.id, { newEmail });
      alert("Correo electrónico actualizado correctamente");
    } catch (err) {
      setError("Error al actualizar el correo electrónico");
      console.error("Error al actualizar el correo electrónico:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    try {
      await updatePassword(user.id, { currentPassword, newPassword });
      alert("Contraseña actualizada correctamente");
    } catch (err) {
      setError("Error al actualizar la contraseña");
      console.error("Error al actualizar la contraseña:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Editar Perfil</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-md"
          disabled={loading}
        />
        <Button onClick={handleUpdateName} className="mt-2" disabled={loading}>
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
        <Button onClick={handleUpdateEmail} className="mt-2" disabled={loading}>
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
        <Button onClick={handleUpdatePassword} className="mt-2" disabled={loading}>
          {loading ? "Guardando..." : "Cambiar Contraseña"}
        </Button>
      </div>

      <div className="mt-4">
        <Button onClick={() => navigate("/profile")} className="w-full bg-gray-500 hover:bg-gray-600">
          Volver al Perfil
        </Button>
      </div>
    </div>
  );
};

export default EditProfile;