import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchIngredientsAsync } from "@/store/thunks/ingredientThunks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { IngredientDto } from "@/types/ingredients";
import { searchRecipesAsync } from "@/store/thunks/recipeThunks";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const IngredientSearch = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { ingredients } = useSelector((state: RootState) => state.ingredients);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<IngredientDto[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    dispatch(fetchIngredientsAsync({ pageNumber: 1, pageSize: 1000 }));
  }, [dispatch]);

  const handleSelectIngredient = (ingredient: IngredientDto) => {
    if (!selectedIngredients.some((i) => i.id === ingredient.id)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleRemoveIngredient = (id: number) => {
    setSelectedIngredients(selectedIngredients.filter((i) => i.id !== id));
  };

  const handleSearchRecipes = async () => {
    const ingredientIds = selectedIngredients.map((i) => i.id);
    try {
      await dispatch(searchRecipesAsync({ ingredientIds: ingredientIds.filter(id => id !== undefined) as number[] })).unwrap();
      navigate("/recipes");
    } catch (error) {
      console.error("Error al buscar recetas:", error);
      alert("Ocurrió un error al buscar recetas.");
    }
  };

  const filteredIngredients = searchQuery.trim()
    ? ingredients.filter((ingredient: IngredientDto) =>
        ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : ingredients;

  const totalPages = Math.ceil(filteredIngredients.length / pageSize);
  const paginatedIngredients = filteredIngredients.slice(
    (pageNumber - 1) * pageSize,
    pageNumber * pageSize
  );

  const handlePrevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const handleNextPage = () => {
    if (pageNumber < totalPages) setPageNumber(pageNumber + 1);
  };

  return (
    <div className="mt-8 p-4 md:p-6">
      {/* Título */}
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
        Buscar por Ingredientes
      </h1>

      {/* Barra de Búsqueda */}
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar ingredientes..."
        className="w-full p-3 mb-6 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white"
      />

      {/* Ingredientes Seleccionados */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Ingredientes Seleccionados:</h2>
        <ScrollArea className="h-20 border rounded-md p-2 dark:bg-gray-800">
          <div className="flex flex-wrap gap-2">
            {selectedIngredients.map((ingredient) => (
              <Badge
                key={ingredient.id}
                variant="secondary"
                className="bg-yellow-200 text-black hover:bg-yellow-300"
              >
                <span>{ingredient.name}</span>
                <button
                  onClick={() => handleRemoveIngredient(ingredient.id!)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Botón para Buscar Recetas */}
      <div className="flex justify-center mt-6">
        <Button
          onClick={handleSearchRecipes}
          className="w-full bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700"
          disabled={selectedIngredients.length === 0}
        >
          Buscar Receta
        </Button>
      </div>

      {/* Lista de Ingredientes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {paginatedIngredients.map((ingredient) => (
          <Card key={ingredient.id} className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <CardContent>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {ingredient.name}
              </h3>
              <div className="flex justify-between space-x-2">
                <Button
                  onClick={() => handleSelectIngredient(ingredient)}
                  className="w-full bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                >
                  Seleccionar
                </Button>
                <Button
                  onClick={() => console.log("Agregar al carrito:", ingredient.name)}
                  className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Agregar al Carrito
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-6 space-x-4">
        <Button
          onClick={handlePrevPage}
          disabled={pageNumber === 1}
          className="bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          Anterior
        </Button>
        <span className="text-gray-800 dark:text-gray-200">
          Página {pageNumber} de {totalPages}
        </span>
        <Button
          onClick={handleNextPage}
          disabled={pageNumber >= totalPages}
          className="bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default IngredientSearch;