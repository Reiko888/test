import BanCard from "./BanCard";
import DisplayHeader from "./DisplayHeader";

interface DisplayViewProps {
  category: string;
  bannedItems: string[];
}

export default function DisplayView({ category, bannedItems }: DisplayViewProps) {
  const gridCols = category === 'maps' || category === 'killers' 
    ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
    : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6';

  const categoryTitle = category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DisplayHeader />
      
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <h1 className="text-5xl font-display font-bold text-foreground mb-12 text-center">
          Banned {categoryTitle}
        </h1>
        
        {bannedItems.length === 0 ? (
          <div className="text-center">
            <p className="text-2xl text-muted-foreground">No bans yet</p>
            <div className={`grid ${gridCols} gap-4 mt-8 opacity-10`}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square border-2 border-dashed border-border rounded-md" />
              ))}
            </div>
          </div>
        ) : (
          <div className={`grid ${gridCols} gap-6 max-w-7xl w-full`}>
            {bannedItems.map((item) => (
              <div key={item} className="animate-in fade-in duration-300">
                <BanCard name={item} isBanned={true} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
