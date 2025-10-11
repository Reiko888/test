import { useState } from "react";
import DisplayView from "@/components/DisplayView";

export default function SurvivorPerks() {
  const [bannedItems] = useState<string[]>([]);

  return <DisplayView category="survivor-perks" bannedItems={bannedItems} />;
}
