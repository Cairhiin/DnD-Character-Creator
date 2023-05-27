import { useState, useEffect } from "react";

export const useFetchSimpleWeapons: () => { isLoading: boolean, error: string, simpleWeapons: Array<any> } = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [simpleWeapons, setSimpleWeapons] = useState<any>([]);
    const [error, setError] = useState<string>("");
    
    useEffect(() => {
        setLoading(true);
        try {
          fetch("http://www.dnd5eapi.co/api/equipment-categories/simple-weapons")
            .then((res) => res.json())
            .then(({ equipment }) => {
              setSimpleWeapons(equipment);
            });
        } catch (err: any) {
          console.error(err);
          setError("API not responding: unable to load simple weapons.");
        }
        setLoading(false);
      }, []);

    return { isLoading, error, simpleWeapons };
}