import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] sm:h-[70vh] md:h-[60vh] bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-yellow-500">404</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
        Lo sentimos, la página que buscas no existe.
      </p>
      <Link to="/" className="mt-6 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
        Volver al Inicio
      </Link>
    </div>
  );
};

export default NotFound;