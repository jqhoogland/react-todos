import { useState } from "react";

export function usePersistedState<T>(key: string, initialValue: T) {
    // Can also load this in a `useLayoutEffect` instead
    const [value, setValue] = useState<T>(() => {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    });
    
    // Can also `localStorage.setItem` in a `useEffect` that listens to `value`, 
    // but this is not the "proper" way to do it.
    const setAndSaveValue = (newValue: T) => {
        localStorage.setItem(key, JSON.stringify(newValue));
        setValue(newValue);
    }
  
    return [value, setAndSaveValue] as const;
}
  
export function useListMethods<T extends  {id: number }>(list: T[], setList: (list: T[]) => void) {
  const create = (item: Omit<T, 'id'>) => {
    setList([...list, { id: list.length, ...item } as T])
  }

  const update = (id: number, newValue: Partial<T>) => {
    setList(list.map(item => item.id === id ? { ...item, ...newValue } : item))
  }

  const remove = (id: number) => {
    setList(list.filter(item => item.id !== id))
  }

  return { create, update, remove }
}