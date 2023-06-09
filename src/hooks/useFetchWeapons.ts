import { useState, useEffect } from "react";

export const useFetchWeapons: (weaponType: string) => { isLoading: boolean, error: string, weapons: Array<any> } = (weaponType) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [weapons, setWeapons] = useState<any>([]);
    const [error, setError] = useState<string>("");
    
    useEffect(() => {
        setLoading(true);
        let ignore = false;
        
        if (!ignore && weaponType) {
          try {
            fetch(`http://www.dnd5eapi.co/api/equipment-categories/${weaponType}`)
              .then((res) => res.json())
              .then(({ equipment }) => {
                setWeapons(equipment);
              });
          } catch (err: any) {
            console.error(err);
            setError(`API not responding: unable to load ${weaponType}.`);
          } finally {
            setLoading(false);
          }
        
        }
        return () => {
          ignore = true;
        };
      }, [weaponType]);

    return { isLoading, error, weapons };
}