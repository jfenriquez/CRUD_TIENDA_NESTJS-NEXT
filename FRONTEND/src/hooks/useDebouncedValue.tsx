import { useState, useEffect } from "react";

export const useDebouncedValue = (input: string = "", time: number = 500) => {
////cada 500ms
  const [debouncedValue, setDebouncedValue] = useState(input);

  useEffect(() => {
    ////setear el valor de input
    const timeout = setTimeout(() => {
      setDebouncedValue(input);
    }, time); 
 
    ////limpiar el timeout anterior y setear el nuevo timeout
    return () => {
      clearTimeout(timeout);
    };
  }, [input]);
      
  return debouncedValue;
};
