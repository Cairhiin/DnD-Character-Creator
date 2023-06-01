import { ApiClass } from "@/types";
import { useState, useEffect } from "react";

export const useFetchFeatureLevelData: (dndClass: ApiClass, classLevel: number) => { 
    isLoading: boolean, error: string, featureData: any 
} = (dndClass, classLevel) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [featureData, setFeatureData] = useState<any>([]);
    const [error, setError] = useState<string>("");

useEffect(() => {
    setLoading(true);
    let ignore = false;
    if (!ignore) {
      fetch(`https://www.dnd5eapi.co${dndClass.url}/levels/${classLevel}/features`)
        .then((res) => res.json())
        .then((data) => {
            setFeatureData(data.results);
            setLoading(false);
        });
    }

    return () => {
      ignore = true;
    };
  }, [dndClass, classLevel]);

  return { featureData, isLoading, error };
}