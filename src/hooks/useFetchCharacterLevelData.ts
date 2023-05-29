import { ApiClass } from "@/types";
import { useState, useEffect } from "react";

export const useFetchCharacterLevelData: (dndClass: ApiClass, classLevel: number) => { 
    isLoading: boolean, error: string, levelUpData: any 
} = (dndClass, classLevel) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [levelUpData, setLevelData] = useState<any>([]);
    const [error, setError] = useState<string>("");

useEffect(() => {
    setLoading(true);
    let ignore = false;
    if (!ignore) {
      fetch(`https://www.dnd5eapi.co${dndClass.url}/levels/${classLevel}/`)
        .then((res) => res.json())
        .then((data) => {
            setLevelData(data);
            setLoading(false);
        });
    }

    return () => {
      ignore = true;
    };
  }, [dndClass, classLevel]);

  return { levelUpData, isLoading, error };
}