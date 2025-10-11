import DisplayView from "@/components/DisplayView";
import { useWebSocket } from "@/contexts/WebSocketContext";

export default function KillerPerks() {
  const { banState } = useWebSocket();

  return <DisplayView category="killer-perks" bannedItems={banState.killerPerks} />;
}
