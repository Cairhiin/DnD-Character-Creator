import { produce } from 'immer';
import { Equipment } from "@/types";
import { useEffect, useState } from "react";

export const useFetchEquipmentData: (items: Equipment[]) => { 
    equipment: { armors: Equipment[], weapons: Equipment[], misc: Equipment[], shields: Equipment[] }, equipmentIsLoading: boolean, equipmentError: string
} = (items) => {

  const [equipmentIsLoading, setLoading] = useState<boolean>(false);
  const [equipmentError, setError] = useState<string>("");
  const [armors, setArmors] = useState<Equipment[]>([]);
  const [weapons, setWeapons] = useState<Equipment[]>([]);
  const [misc, setMisc] = useState<Equipment[]>([]);
  const [shields, setShields] = useState<Equipment[]>([]);

  useEffect(() => {
    setLoading(true);
    let ignore = false;

    if (!ignore && items) {
        try {
            items.forEach((item: Equipment): void => {
                fetch(`https://www.dnd5eapi.co${item.url}`)
                .then((res) => res.json())
                .then((data) => {

                    if (data.armor_category === "Shield") {
                        setShields(shields => [...shields, data]);
                    }
                    
                    else if (
                    data.armor_category === "Light" ||
                    data.armor_category === "Medium" ||
                    data.armor_category === "Heavy"
                    ) {
                        setArmors(armors => [...armors, data]);
                    }
                    
                    else if (data.equipment_category?.name === "Weapon") {
                        setWeapons(weapons => [...weapons, data]);
                    }

                    else {
                        setMisc(misc => [...misc, data]);
                    }
                });       
      });
        } catch (err) {
            console.error(err)
            setError("Failed to load equipment data");
        } finally {
            setLoading(false);
        }
    }

    return () => {
      ignore = true;
    };
  }, [items]);

  return { 
    equipment: { 
        armors: armors, 
        weapons: weapons, 
        misc: misc, 
        shields: shields 
    }, 
    equipmentIsLoading, 
    equipmentError 
};
}