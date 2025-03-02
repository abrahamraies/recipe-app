import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { fetchRecipeAsync } from "@/store/thunks/recipeThunks";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const recipe = useAppSelector((state) => state.recipes.selectedRecipe);
  const loading = useAppSelector((state) => state.recipes.loading);
  const error = useAppSelector((state) => state.recipes.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchRecipeAsync(Number(id))).catch((err) => {
        console.error("Error al cargar los detalles de la receta:", err);
        toast.error("Error al cargar los detalles de la receta.");
      });
    }
  }, [dispatch, id]);

  if (loading) return <p className="text-center text-lg">Cargando detalles...</p>;
  if (error) return null;
  if (!recipe) return <p className="text-center text-lg">Receta no encontrada.</p>;

  return (
    <div className="mt-8 p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">{recipe.title}</h1>
      <img
        src={recipe.imageUrl || "https://via.placeholder.com/600x400"}
        alt={recipe.title}
        className="w-full h-96 object-cover rounded-lg mb-6 sm:h-72"
      />
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Descripción:</h2>
        <p className="text-gray-700 dark:text-gray-300">{recipe.description}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Ingredientes:</h2>
        <ul className="list-disc pl-6">
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient.ingredientId} className="text-gray-700 dark:text-gray-300">
              {`${ingredient.quantity} ${ingredient.ingredient.unit} de ${ingredient.ingredient.name}`}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Instrucciones:</h2>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{recipe.instructions}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Tiempo de Preparación:</h2>
        <p className="text-gray-700 dark:text-gray-300">{recipe.preparationTime} minutos</p>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={() => navigate("/recipes")}
          className="bg-blue-500 hover:bg-blue-600 transition-colors"
        >
          Volver a Recetas
        </Button>
      </div>
    </div>
  );
};

export default RecipeDetails;