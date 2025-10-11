import { useState } from "react";
import { Button } from "@/components/ui/button";
import BanCard from "./BanCard";
import { RotateCcw } from "lucide-react";

interface ControllerPanelProps {
  category: string;
  items: string[];
  bannedItems: string[];
  onToggleBan: (item: string) => void;
  onResetAll: () => void;
}

export default function ControllerPanel({ 
  category, 
  items, 
  bannedItems, 
  onToggleBan,
  onResetAll 
}: ControllerPanelProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter(item => 
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const gridCols = category === 'maps' || category === 'killers' 
    ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
    : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6';

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-card border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-2 bg-background border border-input rounded-md text-foreground"
              data-testid="input-search"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            {bannedItems.length} banned
          </div>
          <Button
            variant="destructive"
            onClick={onResetAll}
            className="gap-2"
            data-testid="button-reset"
          >
            <RotateCcw className="h-4 w-4" />
            Reset All
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-display font-bold text-foreground mb-6">
          Controller - {category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
        </h1>
        
        <div className={`grid ${gridCols} gap-4`}>
          {filteredItems.map((item) => (
            <BanCard
              key={item}
              name={item}
              isBanned={bannedItems.includes(item)}
              onToggleBan={() => onToggleBan(item)}
              showControls={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
