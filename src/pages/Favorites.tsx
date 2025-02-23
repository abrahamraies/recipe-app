import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/useAppDispatch";
import { Button } from "@/components/ui/button";
import { RecipeDto } from "@/types/recipes";
import { useFavorites } from "@/hooks/useFavorites";

const Favorites = () => {
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.id;
  const { favorites, handleRemoveFavorite } = useFavorites(userId || 0);
  const [favoriteRecipes, setFavoriteRecipes] = useState<RecipeDto[]>([]);

  useEffect(() => {
    if (favorites.length > 0) {
      setFavoriteRecipes(favorites.map((fav) => fav.recipe));
    } else {
      setFavoriteRecipes([]);
    }
  }, [favorites]);

  return (
    <div className="mt-8 p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Favoritos</h1>
      {favoriteRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favoriteRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
              <img
                src={recipe.imageUrl || "https://via.placeholder.com/300"}
                alt={recipe.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{recipe.title}</h3>
                <Button
                  onClick={() => handleRemoveFavorite(recipe.id)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md"
                >
                  Eliminar de Favoritos
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300 text-center text-lg">
          No tienes recetas favoritas.
        </p>
      )}
    </div>
  );
};

export default Favorites;