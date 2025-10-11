import { Link } from "wouter";
import { Users, Skull, Map, Ghost } from "lucide-react";

const categories = [
  { id: 'survivor-perks', label: 'Survivor Perks', icon: Users, color: 'from-blue-500/20 to-cyan-500/20' },
  { id: 'killer-perks', label: 'Killer Perks', icon: Skull, color: 'from-red-500/20 to-orange-500/20' },
  { id: 'maps', label: 'Maps', icon: Map, color: 'from-green-500/20 to-emerald-500/20' },
  { id: 'killers', label: 'Killers', icon: Ghost, color: 'from-purple-500/20 to-pink-500/20' }
];

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <h1 className="text-6xl font-display font-bold text-center text-foreground mb-4">
          Dead by Daylight
        </h1>
        <p className="text-xl text-center text-muted-foreground mb-16">
          Tournament Ban System
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link key={cat.id} href={`/${cat.id}`}>
                <a 
                  className="group relative overflow-hidden rounded-lg border border-border bg-card p-8 hover-elevate active-elevate-2 transition-all"
                  data-testid={`link-${cat.id}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="relative flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-foreground">
                      {cat.label}
                    </h2>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="/control">
            <a className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-md font-semibold hover-elevate active-elevate-2" data-testid="link-controller">
              🎮 Controller Panel
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
