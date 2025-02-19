const RecipeDetails = () => {

  // Lógica para obtener los detalles de la receta (usar useRecipes hook)
  const recipe = {
    id: 1,
    title: "Pasta Carbonara",
    image: "/images/placeholder-recipe.jpg",
    ingredients: ["Pasta", "Huevo", "Panceta", "Queso Parmesano"],
    steps: ["Cocinar la pasta", "Freír la panceta", "Mezclar todo"],
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover mb-4" />
      <h2 className="text-2xl font-bold mb-2">Ingredientes</h2>
      <ul className="list-disc pl-5 mb-4">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2 className="text-2xl font-bold mb-2">Preparación</h2>
      <ol className="list-decimal pl-5">
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetails;