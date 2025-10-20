import { Calendar } from "lucide-react";

export const Header = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('de-CH', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <header className="border-b border-border bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm opacity-90">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="text-sm opacity-90">Ausgabe dieser Woche</div>
        </div>
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-2">
            Küttiger Weekly
          </h1>
          <p className="text-lg md:text-xl opacity-90 font-light tracking-wide">
            Ihre digitale Wochenzeitung
          </p>
        </div>
      </div>
    </header>
  );
};
