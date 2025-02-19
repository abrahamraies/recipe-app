import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  const featuredRecipes = [
    { id: 1, title: "Pasta Alfredo", image: "https://via.placeholder.com/300" },
    { id: 2, title: "Ensalada César", image: "https://via.placeholder.com/300" },
    { id: 3, title: "Tacos Mexicanos", image: "https://via.placeholder.com/300" },
  ];

  return (
    <div className="text-center mt-8 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-extrabold text-yellow-500 mb-4"
      >
        Bienvenido a Recipe App
      </motion.h1>
      <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Explora deliciosas recetas, guarda tus favoritas y organiza tu lista de compras con facilidad.
      </p>
      <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
        <Button variant="default" className="bg-yellow-500 hover:bg-yellow-600 px-8 py-3 text-lg">Explorar Recetas</Button>
        <Button variant="secondary" className="px-8 py-3 text-lg">Ver Favoritos</Button>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-700 dark:text-gray-200">Recetas Destacadas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredRecipes.map((recipe) => (
            <motion.div
              key={recipe.id}
              whileHover={{ scale: 1.05 }}
              className="card"
            >
              <Card>
                <img src={recipe.image} alt={recipe.title} className="w-full h-56 object-cover rounded-t-lg" />
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{recipe.title}</h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
