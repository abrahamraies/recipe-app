import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast("Sesión cerrada correctamente.", {
      icon: "👋",
      action: {
        label: "Aceptar",
        onClick: () => dispatch(logout()),
      },
    });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="mt-8">
      <h1 className="text-3xl font-bold text-center mb-6">Mi Perfil</h1>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-md mx-auto">
        <div className="flex flex-col items-center mb-6">
          <p className="text-xl font-semibold">{user.name}</p>
          <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
        </div>
        <div className="space-y-4">
          <div>
            <p className="mb-2"><strong>Nombre:</strong> {user.name}</p>
            <p className="mb-2"><strong>Email:</strong> {user.email}</p>
          </div>
          <div className="flex flex-col space-y-2">
          <Button
              onClick={() => navigate("/edit-profile")}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Editar Perfil
            </Button>
            <Button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600"
            >
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;