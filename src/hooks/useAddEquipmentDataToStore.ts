import { produce } from 'immer';
import { Equipment, Item } from "@/types";
import { useEffect, useState } from "react";
import { useCharacterStore } from '@/store';

export const useAddEquipmentDataToStore: (equipment: Equipment[]) => { 
    equipmentIsLoading: boolean, equipmentError: string
} = (equipment) => {

  const [equipmentIsLoading, setLoading] = useState<boolean>(false);
  const [equipmentError, setError] = useState<string>("");
  const addWeapon = useCharacterStore((state) => state.addWeapon);
  const addArmor = useCharacterStore((state) => state.addArmor);
  const addShield = useCharacterStore((state) => state.addShield);
  const addMisc = useCharacterStore((state) => state.addMisc);

  useEffect(() => {
    setLoading(true);
    let ignore = false;

    if (!ignore) {
        try {
            equipment.forEach((item: Equipment): void => {
                fetch(`https://www.dnd5eapi.co${item.url}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.armor_category === "Shield") {
                        addShield(data);
                    }
                    
                    else if (
                    data.armor_category === "Light" ||
                    data.armor_category === "Medium" ||
                    data.armor_category === "Heavy"
                    ) {
                        addArmor(data);
                    }
                    
                    else if (data.equipment_category?.name === "Weapon") {
                        addWeapon(data);
                    }

                    else {
                        addMisc(data);
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

  return { equipmentIsLoading, equipmentError };
}