import { Calendar, Home, Info, MessageSquare } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const today = new Date();
  const location = useLocation();
  const formattedDate = today.toLocaleDateString('de-CH', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/polls", label: "Umfragen", icon: MessageSquare },
    { path: "/info", label: "Info", icon: Info },
  ];

  return (
    <header className="relative overflow-hidden border-b border-border bg-pattern">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-95"></div>
      
      <div className="relative container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 text-sm text-white/90 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Calendar className="h-4 w-4" />
            <span className="font-medium">{formattedDate}</span>
          </div>
          <div className="text-sm text-white/90 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 font-medium">
            Ausgabe dieser Woche
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-4 text-white drop-shadow-lg">
            Küttiger Weekly
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium tracking-wide">
            Ihre digitale Wochenzeitung
          </p>
        </div>
        
        {/* Modern Navigation */}
        <nav className="flex justify-center">
          <div className="flex gap-2 bg-white/20 backdrop-blur-md rounded-2xl p-2 border border-white/20 shadow-xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`btn-playful flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-white text-primary shadow-lg scale-105"
                      : "text-white/90 hover:text-white hover:bg-white/20 hover:scale-105"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse-slow"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-accent/20 rounded-full blur-lg animate-float"></div>
    </header>
  );
};
