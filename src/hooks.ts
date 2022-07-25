import { useState } from "react";
import {defaultUsers, defaultTodos} from './data';

export const usePersistedState = <T>(key: string, initialValue: T) => {
    const [value, setValue] = useState<T>(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
    });
    
    const setPersistedValue = (newValue: any) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    }

    return [value, setPersistedValue] as const;
}

export const useUsers = () => {
    return usePersistedState('users', defaultUsers);
}

export const useTodos = () => {
    return usePersistedState('todos', defaultTodos);
}