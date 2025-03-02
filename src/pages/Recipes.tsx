import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { fetchRecipesAsync } from "@/store/thunks/recipeThunks";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import {
  addFavoriteAsync,
  removeFavoriteAsync,
} from "@/store/thunks/favoriteThunks";
import { toast } from "sonner";

const Recipes = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { allRecipes, loading, error } = useAppSelector((state) => state.recipes);
  const favorites = useAppSelector((state) => state.favorites.items);
  const user = useAppSelector((state) => state.auth.user);

  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    dispatch(fetchRecipesAsync({ pageNumber: 1, pageSize: 1000 }));
  }, [dispatch]);

  const filteredRecipes = useMemo(() => {
    return searchQuery.trim()
      ? allRecipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : allRecipes;
  }, [allRecipes, searchQuery]);

  const totalPages = Math.ceil(filteredRecipes.length / pageSize);
  const paginatedRecipes = useMemo(() => {
    return filteredRecipes.slice(
      (pageNumber - 1) * pageSize,
      pageNumber * pageSize
    );
  }, [filteredRecipes, pageNumber, pageSize]);

  const isFavorite = useMemo(
    () => (recipeId: number) => {
      return favorites.some((fav) => fav.recipe?.id === recipeId);
    },
    [favorites]
  );

  const handleToggleFavorite = async (recipeId: number) => {
    if (!user) {
      toast.error("Debes iniciar sesión para agregar recetas a favoritos.");
      return;
    }

    const favorite = favorites.find((fav) => fav.recipe?.id === recipeId);
    try {
      if(user.id == null) return;
      if (favorite) {
        await dispatch(removeFavoriteAsync({ userId: user.id, recipeId })).unwrap();
        toast.success("Receta eliminada de favoritos.");
      } else {
        await dispatch(addFavoriteAsync({ userId: user.id, recipeId })).unwrap();
        toast.success("Receta agregada a favoritos.");
      }
    } catch (err) {
      console.error("Error al gestionar favoritos:", err);
      toast.error("No se pudo completar la acción.");
    }
  };

  return (
    <div className="mt-8 p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Recetas</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar recetas..."
        className="w-full p-3 mb-6 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
      <Button
        onClick={() => navigate("/ingredient-search")}
        className="w-full bg-blue-500 hover:bg-blue-600 mb-6"
      >
        Buscar por Ingredientes
      </Button>
      {loading && <p className="text-center text-lg">Cargando recetas...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && paginatedRecipes.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paginatedRecipes.map((recipe) => {
              const isFav = isFavorite(recipe.id);
              return (
                <div
                  key={recipe.id}
                  className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden relative cursor-pointer"
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                >
                  <img
                    src={recipe.imageUrl || "https://via.placeholder.com/300"}
                    alt={recipe.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200 flex justify-between items-center">
                      {recipe.title}
                      <Heart
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFavorite(recipe.id);
                        }}
                        className={`w-6 h-6 cursor-pointer ${
                          isFav ? "text-red-500" : "text-gray-400"
                        }`}
                      />
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center mt-6 space-x-4">
            <Button onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}>
              Anterior
            </Button>
            <span>
              Página {pageNumber} de {totalPages}
            </span>
            <Button
              onClick={() => setPageNumber((prev) => Math.min(prev + 1, totalPages))}
            >
              Siguiente
            </Button>
          </div>
        </div>
      ) : (
        !loading && !error && (
          <p className="text-center text-lg">No hay recetas disponibles.</p>
        )
      )}
    </div>
  );
};

export default Recipes;