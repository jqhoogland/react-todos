import { useCallback, useState } from "react";

export function usePersistedState<T>(key: string, initialValue: T) {
    // Can also load this in a `useLayoutEffect` instead
    const [value, setValue] = useState<T>(() => {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    });
    
    // Can also `localStorage.setItem` in a `useEffect` that listens to `value`, 
    // but this is not the "proper" way to do it.
    const setAndSaveValue = useCallback((newValue: T) => {
        localStorage.setItem(key, JSON.stringify(newValue));
        setValue(newValue);
    }, [setValue])
  
    return [value, setAndSaveValue] as const;
}
  
export function useListMethods<T extends  {id: number }>(list: T[], setList: (list: T[]) => void) {
  const create = useCallback((item: Omit<T, 'id'>) => {
    setList([...list, { id: list.length, ...item } as T])
  }, [setList])

  const update = useCallback((id: number, newValue: Partial<T>) => {
    setList(list.map(item => item.id === id ? { ...item, ...newValue } : item))
  }, [setList])

  const remove = useCallback((id: number) => {
    setList(list.filter(item => item.id !== id))
  }, [setList])

  return { create, update, remove }
}