import DisplayView from "@/components/DisplayView";
import { useWebSocket } from "@/contexts/WebSocketContext";

export default function Killers() {
  const { banState } = useWebSocket();

  return <DisplayView category="killers" bannedItems={banState.killers} />;
}
