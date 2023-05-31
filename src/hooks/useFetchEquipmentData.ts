import { produce } from 'immer';
import { Equipment, Item } from "@/types";
import { useEffect, useState } from "react";

export const useFetchEquipmentData: (equipment: Equipment[]) => { 
    equipmentIsLoading: boolean, equipmentError: string, armors: Item[], weapons: Item[], shields: Item[], misc: Item[]
} = (equipment) => {

  const [equipmentIsLoading, setLoading] = useState<boolean>(false);
  const [equipmentError, setError] = useState<string>("");
  const [armors, setArmors] = useState<any>([]);
  const [shields, setShields] = useState<Item[]>([]);
  const [weapons, setWeapons] = useState<Item[]>([]);
  const [misc, setMisc] = useState<Item[]>([]);

  useEffect(() => {
    setLoading(true);
    let ignore = false;
    let i = 0;
    if (!ignore) {
        try {
            equipment.forEach((item: Item): void => {
                fetch(`https://www.dnd5eapi.co${item.url}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.armor_category === "Shield") {
                        setShields((prevState: Item[]) => [...prevState, data]);
                    }
                    
                    else if (
                    data.armor_category === "Light" ||
                    data.armor_category === "Medium" ||
                    data.armor_category === "Heavy"
                    ) {
                        setArmors((prevState: Item[]) => [...prevState, data]);
                    }
                    
                    else if (data.equipment_category?.name === "Weapon") {
                        setWeapons((prevState: Item[]) => [...prevState, data]);
                    }

                    else {
                        setMisc((prevState: Item[]) => [...prevState, data]);
                    }
                });       
      });
        } catch (err) {
            console.log(err)
            setError("Failed to load equipment data");
        } finally {
            setLoading(false);
        }
    }

    return () => {
      ignore = true;
    };
  }, [equipment]);

  return { equipmentIsLoading, equipmentError, weapons, armors, shields, misc };
}