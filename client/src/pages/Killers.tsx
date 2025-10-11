import { useState } from "react";
import DisplayView from "@/components/DisplayView";

export default function Killers() {
  const [bannedItems] = useState<string[]>([]);

  return <DisplayView category="killers" bannedItems={bannedItems} />;
}
