import { SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";

const Recipes = () => {
  const dummyRecipes = [
    { id: 1, title: "Pasta Alfredo", rating: 4.5, image: "https://www.todoparaellas.com/u/fotografias/m/2021/7/20/f1280x720-33469_165144_5050.png" },
    { id: 2, title: "Ensalada César", rating: 4.2, image: "https://www.lavanguardia.com/files/og_thumbnail/uploads/2018/06/18/5e997e650c7b6.jpeg" },
    { id: 3, title: "Tacos Mexicanos", rating: 4.7, image: "https://chefeel.com/chefgeneralfiles/2021/12/tacos-1-scaled.jpg" },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: { target: { value: SetStateAction<string>; }; }) => setSearchQuery(e.target.value);

  const filteredRecipes = dummyRecipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
            <img src={recipe.image} alt={recipe.title} className="w-full h-56 object-cover" />
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{recipe.title}</h3>
              <p className="text-yellow-500 mb-4 font-medium">{recipe.rating} ★</p>
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-md">
                Agregar a Favoritos
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
