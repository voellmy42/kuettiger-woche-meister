import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ArticleNavProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  unreadCounts: Record<string, number>;
}

export const ArticleNav = ({ activeCategory, onCategoryChange, unreadCounts }: ArticleNavProps) => {
  const categories = [
    { id: "alle", label: "Alle", color: "category-alle" },
    { id: "politik", label: "Politik & Amtliches", color: "category-politik" },
    { id: "lokales", label: "Lokale Nachrichten", color: "category-lokales" },
    { id: "sport", label: "Sport & Vereine", color: "category-sport" },
    { id: "kirche", label: "Kirche & Soziales", color: "category-kirche" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border mb-8 shadow-sm">
      <div className="container mx-auto px-4">
        {/* Mobile: dropdown */}
        <div className="py-4 sm:hidden">
          <Select value={activeCategory} onValueChange={onCategoryChange}>
            <SelectTrigger aria-label="Kategorie wählen" className="h-12 rounded-xl border-2 focus:border-primary">
              <SelectValue placeholder="Kategorie" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-2">
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id} className="rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full bg-${cat.color}`}></div>
                    {cat.label}
                    {unreadCounts[cat.id] ? ` (${unreadCounts[cat.id]})` : ""}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Desktop/tablet: modern pill buttons */}
        <div className="hidden sm:flex items-center gap-3 py-6 flex-wrap justify-center">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = unreadCounts[cat.id] || 0;
            
            return (
              <Button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                variant="ghost"
                className={`btn-playful whitespace-nowrap px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  isActive 
                    ? `bg-${cat.color} text-white shadow-lg scale-105` 
                    : `hover:bg-${cat.color}/10 hover:text-${cat.color} hover:scale-105 border-2 border-transparent hover:border-${cat.color}/20`
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : `bg-${cat.color}`}`}></div>
                  {cat.label}
                </div>
                {count > 0 && (
                  <Badge 
                    variant="secondary" 
                    className={`ml-2 px-2 py-1 text-xs font-bold rounded-full ${
                      isActive 
                        ? "bg-white/20 text-white" 
                        : `bg-${cat.color} text-white`
                    }`}
                  >
                    {count}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
