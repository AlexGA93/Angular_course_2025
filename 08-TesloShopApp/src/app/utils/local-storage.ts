export const getFromLocalStorage = (key: string): string | null => localStorage.getItem(key);

export const saveToLocalStorage = (key: string, value: string): void => localStorage.setItem(key, value);

export const deleteToLocalStorage = (key: string): void => localStorage.removeItem(key);