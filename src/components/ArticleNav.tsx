import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
        <div className="flex items-center gap-2 py-4 overflow-x-auto">
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
        </div>
      </div>
    </nav>
  );
};
