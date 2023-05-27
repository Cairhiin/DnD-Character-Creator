import { useState, useEffect } from "react";

export const useFetchMartialMeleeWeapons: () => { isLoading: boolean, error: string, martialMeleeWeapons: Array<any> } = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [martialMeleeWeapons, setMartialMeleeWeapons] = useState<any>([]);
    const [error, setError] = useState<string>("");
    
    useEffect(() => {
        setLoading(true);
        try {
          fetch("http://www.dnd5eapi.co/api/equipment-categories/martial-melee-weapons")
            .then((res) => res.json())
            .then(({ equipment }) => {
              setMartialMeleeWeapons(equipment);
            });
        } catch (err: any) {
          console.error(err);
          setError("API not responding: unable to load simple weapons.");
        }
        setLoading(false);
      }, []);

    return { isLoading, error, martialMeleeWeapons };
}