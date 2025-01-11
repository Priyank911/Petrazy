import { useState, useEffect } from 'react';
import { storageKey } from '../utils/helpers';

export const useLocalStorage = (key, initialValue) => {
  const storageKeyFull = `${storageKey}_${key}`;
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(storageKeyFull);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error parsing local storage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
        localStorage.setItem(storageKeyFull, JSON.stringify(value));
    } catch (error) {
        console.error("Error setting local storage:", error);
    }
  }, [key, value, storageKeyFull]);

  return [value, setValue];
};