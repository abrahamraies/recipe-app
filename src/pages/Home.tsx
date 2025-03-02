import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { fetchRandomRecipesAsync } from "@/store/thunks/recipeThunks";
import { RecipeDto } from "@/types/recipes";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "sonner";

const Home = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.recipes);
  const user = useAuth();
  const navigate = useNavigate();

  const [randomRecipes, setRandomRecipes] = useLocalStorage<RecipeDto[]>("randomRecipes", []);
  const [lastUpdated, setLastUpdated] = useLocalStorage<string>("lastUpdated", "");

  const hasThreeDaysPassed = (lastUpdated: string): boolean => {
    const lastDate = new Date(lastUpdated);
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - lastDate.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    return daysDiff >= 3;
  };

  useEffect(() => {
    if (randomRecipes.length > 0 && lastUpdated && !hasThreeDaysPassed(lastUpdated)) {
      return;
    }

    dispatch(fetchRandomRecipesAsync())
      .unwrap()
      .then((newRecipes) => {
        setRandomRecipes(newRecipes);
        setLastUpdated(new Date().toISOString());
      })
      .catch((err) => {
        toast.error("Error al cargar recetas destacadas.");
        console.log(err);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleFavoritesClick = () => {
    if (!user) {
      toast.error("Debes iniciar sesión para ver tus recetas favoritas.", {
        action: {
          label: "Iniciar Sesión",
          onClick: () => navigate("/login"),
        },
      });
    } else {
      navigate("/favorites");
    }
  };

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
        Explora recetas, guarda tus favoritas y organiza tu lista de compras con facilidad.
      </p>
      <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
      <Button
          variant="default"
          className="bg-yellow-500 hover:bg-yellow-600 px-8 py-3 text-lg"
          asChild
        >
          <Link to="/recipes" className="text-black">
          Explorar Recetas
          </Link>
        </Button>
        <Button
          variant="secondary"
          className="px-8 py-3 text-lg"
          onClick={handleFavoritesClick}
        >
          Ver Favoritos
        </Button>
      </div>
      <div className="mt-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-700 dark:text-gray-200">
          Recetas Destacadas
        </h2>
        {loading && (
          <p className="text-lg text-gray-500 dark:text-gray-300">Cargando recetas...</p>
        )}
        {error && (
          <p className="text-lg text-red-500">Error al cargar recetas: {error}</p>
        )}
        {!loading && !error && randomRecipes.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {randomRecipes.map((recipe) => (
              <motion.div
                key={recipe.id}
                whileHover={{ scale: 1.05 }}
                className="card"
              >
                <Card>
                  <img
                    src={recipe.imageUrl || "https://via.placeholder.com/300"}
                    alt={recipe.title}
                    className="w-full h-56 object-cover rounded-t-lg"
                  />
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {recipe.title}
                    </h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          !loading && !error && (
            <p className="text-lg text-gray-500 dark:text-gray-300">
              No hay recetas destacadas disponibles.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Home;