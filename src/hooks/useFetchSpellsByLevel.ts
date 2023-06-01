import type { ApiClass, Spell } from "@/types";
import { useEffect, useState } from "react";

export const useFetchSpellsByLevel: (dndClass: ApiClass, classLevel: number) => { 
    isLoading: boolean, error: string, spells: Array<Spell> 
} = (dndClass, classLevel) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [spells, setSpells] = useState<any>([]);
    const [error, setError] = useState<string>("");
    
    useEffect(() => {
        setLoading(true);
        let ignore = false;
        if (!ignore) {
            try {
                fetch(
                    `https://www.dnd5eapi.co${dndClass.url}/levels/${classLevel}/spells`
                )
                    .then((res) => res.json())
                    .then((data) => {
                    setSpells(data.results);
                    setLoading(false);
                    });
                }
            catch (err) {
                console.error("Error: ", err);
                setError("Failed to load to spells.");
            }
        }

        return () => {
            ignore = true;
        };
        
    }, [dndClass, classLevel]);

  return { isLoading, error, spells };
}