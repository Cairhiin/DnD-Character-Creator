import { ApiRace } from "@/types";
import { useState, useEffect } from "react";

export const useFetchRaceProficiencies: (race: ApiRace) => { 
    isLoading: boolean, error: string, raceProficiencies: any 
} = (race) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [raceProficiencies, setRaceProficiencies] = useState<any>([]);
    const [error, setError] = useState<string>("");

useEffect(() => {
    setLoading(true);
    let ignore = false;
    if (!ignore && race.index) {
        try {
            fetch(`https://www.dnd5eapi.co${race.url}/proficiencies/`)
                .then((res) => res.json())
                .then((data) => {
                    setRaceProficiencies(data.results);       
                });
        } catch (err) {
            console.error(err);
            setError("Failed to retrieve race proficiencies.");
        } finally {
            setLoading(false);
        }
    }

    return () => {
      ignore = true;
    };
  }, [race]);

  return { raceProficiencies, isLoading, error };
}