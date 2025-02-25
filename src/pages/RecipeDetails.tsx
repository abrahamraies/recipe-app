import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipe } from "@/services/recipeService";
import { Button } from "@/components/ui/button";
import { RecipeDto } from "@/types/recipes";

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<RecipeDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        setLoading(true);
        const data = await getRecipe(Number(id));
        setRecipe(data);
      } catch (err) {
        setError("Error al cargar los detalles de la receta.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) return <p className="text-center text-lg">Cargando detalles...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!recipe) return <p className="text-center text-lg">Receta no encontrada.</p>;

  return (
    <div className="mt-8 p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">{recipe.title}</h1>
      <img
        src={recipe.imageUrl || "https://via.placeholder.com/600x400"}
        alt={recipe.title}
        className="w-full h-96 object-cover rounded-lg mb-6"
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
        <Button onClick={() => navigate("/recipes")} className="bg-blue-500 hover:bg-blue-600">
          Volver a Recetas
        </Button>
      </div>
    </div>
  );
};

export default RecipeDetails;