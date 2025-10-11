import { Link, useLocation } from "wouter";

const categories = [
  { id: 'survivor-perks', label: 'Survivor Perks' },
  { id: 'killer-perks', label: 'Killer Perks' },
  { id: 'maps', label: 'Maps' },
  { id: 'killers', label: 'Killers' }
];

export default function DisplayHeader() {
  const [location] = useLocation();

  return (
    <header className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center justify-center gap-2 py-4">
          {categories.map((cat) => {
            const isActive = location === `/${cat.id}`;
            return (
              <Link 
                key={cat.id} 
                href={`/${cat.id}`}
                data-testid={`link-${cat.id}`}
              >
                <a className={`
                  px-6 py-3 font-display text-lg font-semibold transition-all rounded-md
                  ${isActive 
                    ? 'text-primary border-b-4 border-primary bg-primary/10' 
                    : 'text-muted-foreground hover-elevate'
                  }
                `}>
                  {cat.label}
                </a>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
