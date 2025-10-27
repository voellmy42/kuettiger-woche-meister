import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2 } from "lucide-react";

interface ArticleCardProps {
  id: string;
  title: string;
  content: string;
  category?: string;
  isLead?: boolean;
  metadata?: string;
  isRead?: boolean;
  onReadChange?: (id: string, isRead: boolean) => void;
}

export const ArticleCard = ({ 
  id,
  title, 
  content, 
  category, 
  isLead = false,
  metadata,
  isRead = false,
  onReadChange
}: ArticleCardProps) => {
  const getCategoryColor = (cat: string) => {
    switch (cat?.toLowerCase()) {
      case 'politik': return 'category-politik';
      case 'lokales': return 'category-lokales';
      case 'sport': return 'category-sport';
      case 'kirche': return 'category-kirche';
      default: return 'category-alle';
    }
  };

  return (
    <Card className={`card-modern overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
      isLead ? 'border-l-4 border-l-accent shadow-lg' : ''
    } ${isRead ? 'opacity-75' : ''}`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
          <div className="flex-1 min-w-0 w-full max-w-full">
            {category && (
              <Badge 
                className={`w-fit mb-3 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full bg-${getCategoryColor(category)} text-white`}
              >
                {category}
              </Badge>
            )}
            <h2 className={`${isLead ? 'text-3xl md:text-4xl' : 'text-2xl'} font-bold leading-tight break-words mb-2` }>
              {title}
            </h2>
            {metadata && (
              <p className="text-sm text-muted-foreground font-medium">{metadata}</p>
            )}
          </div>
          
          <div className="flex items-center gap-3 pt-1 shrink-0 w-full sm:w-auto">
            <label className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <Checkbox
                checked={isRead}
                onCheckedChange={(checked) => onReadChange?.(id, checked as boolean)}
                className="h-5 w-5 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
              />
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {isRead ? (
                  <span className="flex items-center gap-2 text-accent">
                    <CheckCircle2 className="h-4 w-4" />
                    Gelesen
                  </span>
                ) : (
                  "Als gelesen markieren"
                )}
              </span>
            </label>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="prose prose-gray max-w-none break-words hyphens-auto">
          {content.split('\n').map((paragraph, idx) => (
            paragraph.trim() && (
              <p key={idx} className="mb-4 leading-relaxed text-foreground/90 text-base">
                {paragraph}
              </p>
            )
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
