import { useEffect, useState } from "react";

export function useLocalStorage<T>(defaultValue: T, key: string) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return { value, setValue };
}
