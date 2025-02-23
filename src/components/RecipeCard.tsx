import { useSelector } from "react-redux";
import { addFavoriteAsync } from "@/store/thunks/favoriteThunks";
import { Button } from "./ui/button";
import { RootState } from "@/store/store";
import { FavoriteDto } from "@/types/favorites";
import { useAppDispatch } from "../hooks/useAppDispatch";

interface RecipeCardProps {
  id: number; 
  title: string;
  image: string;
}

export const RecipeCard = ({ id, title, image }: RecipeCardProps) => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleAddToFavorites = () => {
    if (!user?.id) {
      console.error("Usuario no autenticado");
      return;
    }
  
    const favoriteData: FavoriteDto = {
      userId: user.id,
      recipeId: id,
    };

    dispatch(addFavoriteAsync(favoriteData));
  }

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <Button onClick={handleAddToFavorites} className="bg-yellow-500 hover:bg-yellow-600">
          ❤️ Agregar a Favoritos
        </Button>
      </div>
    </div>
  );
};