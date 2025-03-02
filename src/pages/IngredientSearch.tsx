import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchIngredientsAsync } from "@/store/thunks/ingredientThunks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { IngredientDto } from "@/types/ingredients";
import { searchRecipesAsync } from "@/store/thunks/recipeThunks";
import { RootState } from "@/store/store";
import { toast } from "sonner";
import { addItemAsync, fetchShopListAsync } from "@/store/thunks/shoppingListThunks";

const IngredientSearch = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { ingredients } = useAppSelector((state: RootState) => state.ingredients);
  const shoppingListItems = useAppSelector((state: RootState) => state.shoppingList.items);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<IngredientDto[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    dispatch(fetchIngredientsAsync({ pageNumber: 1, pageSize: 1000 }));
    if (user) {
      dispatch(fetchShopListAsync(user.id!));
    }
  }, [dispatch, user]);

  const filteredIngredients = useMemo(() => {
    return searchQuery.trim()
      ? ingredients.filter((ingredient: IngredientDto) =>
          ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : ingredients;
  }, [ingredients, searchQuery]);

  const totalPages = Math.ceil(filteredIngredients.length / pageSize);
  const paginatedIngredients = useMemo(() => {
    return filteredIngredients.slice(
      (pageNumber - 1) * pageSize,
      pageNumber * pageSize
    );
  }, [filteredIngredients, pageNumber, pageSize]);

  const handleSelectIngredient = (ingredient: IngredientDto) => {
    if (!selectedIngredients.some((i) => i.id === ingredient.id)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleRemoveIngredient = (id: number) => {
    setSelectedIngredients(selectedIngredients.filter((i) => i.id !== id));
  };

  const handleSearchRecipes = async () => {
    const ingredientIds = selectedIngredients.map((i) => i.id).filter(Boolean) as number[];
    try {
      const recipes = await dispatch(searchRecipesAsync({ ingredientIds })).unwrap();
      if (recipes.length === 1) {
        navigate(`/recipe/${recipes[0].id}`);
      } else {
        navigate("/recipes");
      }
    } catch (error) {
      console.error("Error al buscar recetas:", error);
      toast.error("Ocurrió un error al buscar recetas.");
    }
  };

  const handleAddToCart = async (ingredientId: number) => {
    if (!user) {
      toast.error("Debes iniciar sesión para agregar elementos al carrito.");
      return;
    }

    const isAlreadyInCart = shoppingListItems.some((item) => item.ingredient.id === ingredientId);
    if (isAlreadyInCart) {
      toast.error("El ingrediente ya está en el carrito.");
      return;
    }

    try {
      await dispatch(addItemAsync({ userId: user.id!, itemId: ingredientId })).unwrap();
      toast.success("Ingrediente agregado al carrito.");
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      toast.error("No se pudo agregar el ingrediente al carrito.");
    }
  };

  return (
    <div className="mt-8 p-4 md:p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
        Buscar por Ingredientes
      </h1>
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar ingredientes..."
        className="w-full p-3 mb-6 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white"
      />
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
      <div className="flex justify-center mt-6">
        <Button
          onClick={handleSearchRecipes}
          className="w-full bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700"
          disabled={selectedIngredients.length === 0}
        >
          Buscar Receta
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {paginatedIngredients.map((ingredient) => {
          const isAlreadyInCart = shoppingListItems.some(
            (item) => item.ingredient.id === ingredient.id
          );
          return (
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
                    onClick={() => handleAddToCart(ingredient.id!)}
                    disabled={isAlreadyInCart}
                    className={`w-full ${
                      isAlreadyInCart
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                    }`}
                  >
                    {isAlreadyInCart ? "Agregado" : "Agregar al Carrito"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="flex justify-center mt-6 space-x-4">
        <Button
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          className="bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          Anterior
        </Button>
        <span className="text-gray-800 dark:text-gray-200">
          Página {pageNumber} de {totalPages}
        </span>
        <Button
          onClick={() => setPageNumber((prev) => Math.min(prev + 1, totalPages))}
          className="bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default IngredientSearch;