import { NextApiRequest, NextApiResponse } from "next";
import { Background } from "@/types";

const BACKGROUNDS: Background[] = [
  {
    id: "acolyte",
    name: "Acolyte",
    skill_proficiencies: ["Insight", "Religion"],
    languages: 2,
    tool_proficiencies: [],
    feature: "Shelter of the Faithful",
  },
  {
    id: "criminal",
    name: "Criminal",
    skill_proficiencies: ["Deception", "Stealth"],
    languages: 0,
    tool_proficiencies: ["Gaming set", "Thieves' Tools"],
    feature: "Criminal Contact",
  },
  {
    id: "folk-hero",
    name: "Folk Hero",
    skill_proficiencies: ["Animal Handling", "Survival"],
    languages: 0,
    tool_proficiencies: ["Artisan's Tools", "Vehicles (land)"],
    feature: "Rustic Hospitality",
  },
  {
    id: "noble",
    name: "Noble",
    skill_proficiencies: ["History", "Persuasion"],
    languages: 1,
    tool_proficiencies: ["Gaming set"],
    feature: "Position of Priviledge",
  },
  {
    id: "sage",
    name: "Sage",
    skill_proficiencies: ["Arcana", "History"],
    languages: 2,
    tool_proficiencies: [],
    feature: "Researcher",
  },
  {
    id: "soldier",
    name: "Soldier",
    skill_proficiencies: ["Athletics", "Intimidation"],
    languages: 0,
    tool_proficiencies: ["Gaming set", "Vehicles (land)"],
    feature: "Military Rank",
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Background[] | any>
) {
  console.log("Request received at /api/backgrounds");
  try {
    res.status(200).json(BACKGROUNDS);
    console.log("Response sent with backgrounds:", BACKGROUNDS);
  } catch (error: any) {
    res.status(500).json({ message: "Server error" });
    console.log("Error sending response:", error.message);
  }
}
