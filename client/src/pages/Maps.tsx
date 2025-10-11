import DisplayView from "@/components/DisplayView";
import { useWebSocket } from "@/contexts/WebSocketContext";

export default function Maps() {
  const { banState } = useWebSocket();

  return <DisplayView category="maps" bannedItems={banState.maps} />;
}
