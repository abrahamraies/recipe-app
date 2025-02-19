import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Trash } from "lucide-react";

const ShoppingList = () => {
  const [items, setItems] = useState(["Tomates", "Cebollas", "Ajo"]);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem.trim()]);
      setNewItem("");
    }
  };

  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));

  return (
    <div className="mt-8 p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Lista de Compras</h1>
      <div className="flex gap-2 mb-6">
        <Input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Agregar ingrediente"
        />
        <Button onClick={addItem} className="bg-green-500 hover:bg-green-600 text-white">Agregar</Button>
      </div>
      {items.length > 0 ? (
        <div className="space-y-3">
          {items.map((item, index) => (
            <Card key={index} className="flex justify-between items-center p-4">
              <CardContent className="p-0 text-lg font-medium">{item}</CardContent>
              <Button variant="ghost" onClick={() => removeItem(index)}>
                <Trash className="w-5 h-5 text-red-500 hover:text-red-700" />
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300 text-center text-lg">No hay elementos en la lista.</p>
      )}
    </div>
  );
};

export default ShoppingList;
