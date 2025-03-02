import { useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error(`Error al cargar ${key} desde localStorage:`, error);
        return initialValue;
      }
    });
  
    const setValue = (value: T) => {
      try {
        setStoredValue(value);
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Error al guardar ${key} en localStorage:`, error);
      }
    };
  
    return [storedValue, setValue] as const;
  };