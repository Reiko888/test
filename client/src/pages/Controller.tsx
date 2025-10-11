import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ControllerPanel from "@/components/ControllerPanel";
import { killerPerks, survivorPerks, maps, killers } from "@/lib/data";
import { useWebSocket } from "@/contexts/WebSocketContext";
import { Wifi, WifiOff, AlertTriangle } from "lucide-react";

export default function Controller() {
  const { banState, isConnected, sendBanUpdate, resetAll } = useWebSocket();
  
  const [bannedKillerPerks, setBannedKillerPerks] = useState<string[]>([]);
  const [bannedSurvivorPerks, setBannedSurvivorPerks] = useState<string[]>([]);
  const [bannedMaps, setBannedMaps] = useState<string[]>([]);
  const [bannedKillers, setBannedKillers] = useState<string[]>([]);

  // Update local state when WebSocket receives updates from other sources
  useEffect(() => {
    setBannedKillerPerks(banState.killerPerks);
    setBannedSurvivorPerks(banState.survivorPerks);
    setBannedMaps(banState.maps);
    setBannedKillers(banState.killers);
  }, [banState]);

  const handleToggleBan = (category: string, item: string) => {
    if (!isConnected) {
      console.warn('Cannot toggle ban - not connected to server');
      return;
    }

    let newBanState = { ...banState };

    if (category === 'killer-perks') {
      const newBanned = bannedKillerPerks.includes(item)
        ? bannedKillerPerks.filter(i => i !== item)
        : [...bannedKillerPerks, item];
      setBannedKillerPerks(newBanned);
      newBanState.killerPerks = newBanned;
    } else if (category === 'survivor-perks') {
      const newBanned = bannedSurvivorPerks.includes(item)
        ? bannedSurvivorPerks.filter(i => i !== item)
        : [...bannedSurvivorPerks, item];
      setBannedSurvivorPerks(newBanned);
      newBanState.survivorPerks = newBanned;
    } else if (category === 'maps') {
      const newBanned = bannedMaps.includes(item)
        ? bannedMaps.filter(i => i !== item)
        : [...bannedMaps, item];
      setBannedMaps(newBanned);
      newBanState.maps = newBanned;
    } else if (category === 'killers') {
      const newBanned = bannedKillers.includes(item)
        ? bannedKillers.filter(i => i !== item)
        : [...bannedKillers, item];
      setBannedKillers(newBanned);
      newBanState.killers = newBanned;
    }

    const success = sendBanUpdate(newBanState);
    if (!success) {
      // Rollback on failure
      setBannedKillerPerks(banState.killerPerks);
      setBannedSurvivorPerks(banState.survivorPerks);
      setBannedMaps(banState.maps);
      setBannedKillers(banState.killers);
    }
  };

  const handleResetAll = () => {
    if (!isConnected) {
      console.warn('Cannot reset - not connected to server');
      return;
    }

    const success = resetAll();
    if (success) {
      setBannedKillerPerks([]);
      setBannedSurvivorPerks([]);
      setBannedMaps([]);
      setBannedKillers([]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Tabs defaultValue="killer-perks" className="w-full">
        <div className="sticky top-0 z-20 bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <TabsList className="justify-start h-auto p-0 bg-transparent">
              <TabsTrigger 
                value="killer-perks" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-3 font-display"
                data-testid="tab-killer-perks"
              >
                Killer Perks
              </TabsTrigger>
              <TabsTrigger 
                value="survivor-perks" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-3 font-display"
                data-testid="tab-survivor-perks"
              >
                Survivor Perks
              </TabsTrigger>
              <TabsTrigger 
                value="maps" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-3 font-display"
                data-testid="tab-maps"
              >
                Maps
              </TabsTrigger>
              <TabsTrigger 
                value="killers" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-3 font-display"
                data-testid="tab-killers"
              >
                Killers
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2 py-3">
              {isConnected ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground" data-testid="status-connected">
                  <Wifi className="h-4 w-4 text-green-500" />
                  <span>Connected</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-destructive" data-testid="status-disconnected">
                  <WifiOff className="h-4 w-4" />
                  <span>Disconnected</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {!isConnected && (
          <div className="max-w-7xl mx-auto px-4 pt-4">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Connection to server lost. Attempting to reconnect... Please wait before making changes.
              </AlertDescription>
            </Alert>
          </div>
        )}

        <TabsContent value="killer-perks" className="m-0">
          <ControllerPanel
            category="killer-perks"
            items={killerPerks}
            bannedItems={bannedKillerPerks}
            onToggleBan={(item) => handleToggleBan('killer-perks', item)}
            onResetAll={handleResetAll}
          />
        </TabsContent>

        <TabsContent value="survivor-perks" className="m-0">
          <ControllerPanel
            category="survivor-perks"
            items={survivorPerks}
            bannedItems={bannedSurvivorPerks}
            onToggleBan={(item) => handleToggleBan('survivor-perks', item)}
            onResetAll={handleResetAll}
          />
        </TabsContent>

        <TabsContent value="maps" className="m-0">
          <ControllerPanel
            category="maps"
            items={maps}
            bannedItems={bannedMaps}
            onToggleBan={(item) => handleToggleBan('maps', item)}
            onResetAll={handleResetAll}
          />
        </TabsContent>

        <TabsContent value="killers" className="m-0">
          <ControllerPanel
            category="killers"
            items={killers}
            bannedItems={bannedKillers}
            onToggleBan={(item) => handleToggleBan('killers', item)}
            onResetAll={handleResetAll}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
