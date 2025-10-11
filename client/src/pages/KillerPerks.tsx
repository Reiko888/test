import { useState } from "react";
import DisplayView from "@/components/DisplayView";

export default function KillerPerks() {
  const [bannedItems] = useState<string[]>([]);

  return <DisplayView category="killer-perks" bannedItems={bannedItems} />;
}
