import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ControllerPanel from "@/components/ControllerPanel";
import { killerPerks, survivorPerks, maps, killers } from "@/lib/data";

export default function Controller() {
  const [bannedKillerPerks, setBannedKillerPerks] = useState<string[]>([]);
  const [bannedSurvivorPerks, setBannedSurvivorPerks] = useState<string[]>([]);
  const [bannedMaps, setBannedMaps] = useState<string[]>([]);
  const [bannedKillers, setBannedKillers] = useState<string[]>([]);

  const handleToggleBan = (category: string, item: string) => {
    const setters = {
      'killer-perks': setBannedKillerPerks,
      'survivor-perks': setBannedSurvivorPerks,
      'maps': setBannedMaps,
      'killers': setBannedKillers
    };

    const setter = setters[category as keyof typeof setters];
    setter(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const handleResetAll = () => {
    setBannedKillerPerks([]);
    setBannedSurvivorPerks([]);
    setBannedMaps([]);
    setBannedKillers([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Tabs defaultValue="killer-perks" className="w-full">
        <div className="sticky top-0 z-20 bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4">
            <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
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
          </div>
        </div>

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
