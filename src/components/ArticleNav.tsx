import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ArticleNavProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  unreadCounts: Record<string, number>;
}

export const ArticleNav = ({ activeCategory, onCategoryChange, unreadCounts }: ArticleNavProps) => {
  const categories = [
    { id: "alle", label: "Alle" },
    { id: "politik", label: "Politik & Amtliches" },
    { id: "lokales", label: "Lokale Nachrichten" },
    { id: "sport", label: "Sport & Vereine" },
    { id: "kirche", label: "Kirche & Soziales" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border mb-8">
      <div className="container mx-auto px-4">
        {/* Mobile: dropdown + clear link, no horizontal scroll */}
        <div className="py-3 sm:hidden">
          <div className="grid grid-cols-2 gap-2">
            <Select value={activeCategory} onValueChange={onCategoryChange}>
              <SelectTrigger aria-label="Kategorie wählen">
                <SelectValue placeholder="Kategorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.label}{unreadCounts[cat.id] ? ` (${unreadCounts[cat.id]})` : ""}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Link to="/info">
              <Button variant="secondary" className="w-full">Infos & Termine</Button>
            </Link>
          </div>
        </div>

        {/* Desktop/tablet: wrapped buttons, no horizontal scroll */}
        <div className="hidden sm:flex items-center gap-2 py-4 flex-wrap">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = unreadCounts[cat.id] || 0;
            
            return (
              <Button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                variant={isActive ? "default" : "ghost"}
                className={`whitespace-nowrap ${
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-secondary"
                }`}
              >
                {cat.label}
                {count > 0 && (
                  <Badge 
                    variant="secondary" 
                    className={`ml-2 ${
                      isActive 
                        ? "bg-primary-foreground text-primary" 
                        : "bg-accent text-accent-foreground"
                    }`}
                  >
                    {count}
                  </Badge>
                )}
              </Button>
            );
          })}
          <Link to="/info">
            <Button variant="secondary" className="whitespace-nowrap">Infos & Termine</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
