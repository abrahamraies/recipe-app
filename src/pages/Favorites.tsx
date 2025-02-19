import { useState } from "react";
import { Button } from "@/components/ui/button";

const Favorites = () => {
  const [favorites, setFavorites] = useState([
    { id: 1, title: "Pasta Alfredo", rating: 4.5, image: "https://via.placeholder.com/300" },
    { id: 2, title: "Ensalada César", rating: 4.2, image: "https://via.placeholder.com/300" },
  ]);

  const removeFavorite = (id: number) => setFavorites(favorites.filter((fav) => fav.id !== id));

  return (
    <div className="mt-8 p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Favoritos</h1>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
              <img src={favorite.image} alt={favorite.title} className="w-full h-56 object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{favorite.title}</h3>
                <p className="text-yellow-500 mb-4 font-medium">{favorite.rating} ★</p>
                <Button
                  onClick={() => removeFavorite(favorite.id)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md"
                >
                  Eliminar de Favoritos
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300 text-center text-lg">No tienes recetas favoritas.</p>
      )}
    </div>
  );
};

export default Favorites;
