import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BanCardProps {
  name: string;
  isBanned?: boolean;
  onToggleBan?: () => void;
  showControls?: boolean;
}

export default function BanCard({ name, isBanned = false, onToggleBan, showControls = false }: BanCardProps) {
  return (
    <div 
      className={`relative group ${isBanned ? 'opacity-100' : 'opacity-100'}`}
      data-testid={`card-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className={`
        relative rounded-md overflow-hidden transition-all duration-200
        ${isBanned ? 'border-4 border-primary' : 'border border-border'}
        ${showControls && !isBanned ? 'hover-elevate cursor-pointer' : ''}
      `}
      onClick={showControls && !isBanned ? onToggleBan : undefined}
      >
        <div className="aspect-square bg-card relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center">
              <div className="text-2xl font-bold text-muted-foreground">?</div>
            </div>
          </div>
          {isBanned && (
            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
              <X className="w-16 h-16 text-primary" strokeWidth={4} />
            </div>
          )}
        </div>
        <div className={`p-2 bg-card text-center ${isBanned ? 'line-through' : ''}`}>
          <p className="text-sm font-medium text-foreground truncate" data-testid={`text-${name.toLowerCase().replace(/\s+/g, '-')}`}>
            {name}
          </p>
        </div>
      </div>
      {showControls && isBanned && (
        <Button
          size="sm"
          variant="destructive"
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
          onClick={onToggleBan}
          data-testid={`button-unban-${name.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}
