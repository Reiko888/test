import DisplayView from "@/components/DisplayView";
import { useWebSocket } from "@/contexts/WebSocketContext";

export default function SurvivorPerks() {
  const { banState } = useWebSocket();

  return <DisplayView category="survivor-perks" bannedItems={banState.survivorPerks} />;
}
