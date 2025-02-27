import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { fetchShopListAsync, removeItemAsync } from "@/store/thunks/shoppingListThunks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash } from "lucide-react";

const ShoppingList = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const items = useAppSelector((state) => state.shoppingList.items);
  const loading = useAppSelector((state) => state.shoppingList.loading);
  const error = useAppSelector((state) => state.shoppingList.error);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchShopListAsync(user.id));
    }
  }, [dispatch, user?.id]);

  const handleRemoveItem = async (itemId: number) => {
    await dispatch(removeItemAsync(itemId));
  };

  if (loading) {
    return <p className="text-center text-lg">Cargando lista de compras...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="mt-8 p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Lista de Compras</h1>
      {items.length > 0 ? (
        <div className="space-y-3">
          {items.map((item) => (
            <Card key={item.id} className="flex justify-between items-center p-4">
              <CardContent className="p-0 text-lg font-medium">
                {item.ingredient?.name || "Ingrediente desconocido"}
              </CardContent>
              <Button
                variant="ghost"
                onClick={() => handleRemoveItem(item.id)}
              >
                <Trash className="w-5 h-5 text-red-500 hover:text-red-700" />
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300 text-center text-lg">
          No hay elementos en la lista.
        </p>
      )}
    </div>
  );
};

export default ShoppingList;