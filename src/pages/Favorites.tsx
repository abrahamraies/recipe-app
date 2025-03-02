import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchFavoritesAsync, removeFavoriteAsync } from "@/store/thunks/favoriteThunks";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Favorites = () => {
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.id;
  const favorites = useAppSelector((state) => state.favorites.items);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(fetchFavoritesAsync(userId));
    }
  }, [dispatch, userId]);

  const handleRemoveFavorite = async (recipeId: number | undefined) => {
    try {
      if (!userId || !recipeId) return;
      await dispatch(removeFavoriteAsync({ userId: userId, recipeId })).unwrap();
      toast.success("Receta eliminada de favoritos.", {
        icon: "❌",
      });
    } catch (error) {
      toast.error("Error al eliminar la receta de favoritos.");
      console.log(error);
    }
  };

  return (
    <div className="mt-8 p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Favoritos</h1>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            <div key={fav.recipe?.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
              <img
                src={fav.recipe?.imageUrl || "https://via.placeholder.com/300"}
                alt={fav.recipe?.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  {fav.recipe?.title}
                </h3>
                <Button
                  onClick={() => handleRemoveFavorite(fav.recipe?.id)}
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