import { Button } from "@/components/ui/button";

const Profile = () => {
  const user = {
    name: "Abraham",
    email: "abraham@example.com",
  };

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
            <Button className="w-full bg-yellow-500 hover:bg-yellow-600">
              Editar Perfil
            </Button>
            <Button className="w-full bg-blue-500 hover:bg-blue-600">
              Cambiar Contraseña
            </Button>
            <Button className="w-full bg-red-500 hover:bg-red-600">
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;