import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { fetchRecipesAsync } from "@/store/thunks/recipeThunks";
import { Button } from "@/components/ui/button";
import { RecipeDto } from "@/types/recipes";
import { useNavigate } from "react-router-dom";

const Recipes = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { allRecipes, loading, error } = useAppSelector((state) => state.recipes);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    dispatch(fetchRecipesAsync({ pageNumber: 1, pageSize: 1000 }));
  }, [dispatch]);

  const filteredRecipes = searchQuery.trim()
    ? allRecipes.filter((recipe: RecipeDto) =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allRecipes;

  const totalPages = Math.ceil(filteredRecipes.length / pageSize);
  const paginatedRecipes = filteredRecipes.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPageNumber(1);
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const handleNextPage = () => {
    if (pageNumber < totalPages) setPageNumber(pageNumber + 1);
  };

  return (
    <div className="mt-8 p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Recetas</h1>

      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
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
            {paginatedRecipes.map((recipe) => (
              <div key={recipe.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
                <img
                  src={recipe.imageUrl || "https://via.placeholder.com/300"}
                  alt={recipe.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{recipe.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 space-x-4">
            <Button onClick={handlePrevPage} disabled={pageNumber === 1}>
              Anterior
            </Button>
            <span>
              Página {pageNumber} de {totalPages}
            </span>
            <Button onClick={handleNextPage} disabled={pageNumber >= totalPages}>
              Siguiente
            </Button>
          </div>
        </div>
      ) : (
        !loading && !error && <p className="text-center text-lg">No hay recetas disponibles.</p>
      )}
    </div>
  );
};

export default Recipes;