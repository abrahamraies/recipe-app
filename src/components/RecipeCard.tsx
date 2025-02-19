import { Button } from "./ui/button";

interface RecipeCardProps {
  title: string;
  image: string;
  rating: number;
  onAddToFavorites: () => void;
}

export const RecipeCard = ({ title, image, rating, onAddToFavorites }: RecipeCardProps) => (
  <div className="border rounded-lg overflow-hidden shadow-lg">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-bold">{title}</h3>
      <p>Rating: {rating}</p>
      <Button onClick={onAddToFavorites}>❤️ Agregar a Favoritos</Button>
    </div>
  </div>
);