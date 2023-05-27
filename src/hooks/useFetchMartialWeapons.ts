import { useState, useEffect } from "react";

export const useFetchMartialWeapons: () => { isLoading: boolean, error: string, martialWeapons: Array<any> } = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [martialWeapons, setMartialWeapons] = useState<any>([]);
    const [error, setError] = useState<string>("");
    
    useEffect(() => {
        setLoading(true);
        try {
          fetch("http://www.dnd5eapi.co/api/equipment-categories/martial-weapons")
            .then((res) => res.json())
            .then(({ equipment }) => {
              setMartialWeapons(equipment);
            });
        } catch (err: any) {
          console.error(err);
          setError("API not responding: unable to load simple weapons.");
        }
        setLoading(false);
      }, []);

    return { isLoading, error, martialWeapons };
}