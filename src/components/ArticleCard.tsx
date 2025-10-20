import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ArticleCardProps {
  title: string;
  content: string;
  category?: string;
  isLead?: boolean;
  metadata?: string;
}

export const ArticleCard = ({ 
  title, 
  content, 
  category, 
  isLead = false,
  metadata 
}: ArticleCardProps) => {
  return (
    <Card className={`overflow-hidden transition-shadow hover:shadow-lg ${isLead ? 'border-l-4 border-l-accent' : ''}`}>
      <CardHeader className="pb-3">
        {category && (
          <Badge variant="secondary" className="w-fit mb-2 text-xs font-semibold uppercase tracking-wide">
            {category}
          </Badge>
        )}
        <h2 className={`${isLead ? 'text-3xl md:text-4xl' : 'text-2xl'} font-bold leading-tight`}>
          {title}
        </h2>
        {metadata && (
          <p className="text-sm text-muted-foreground mt-2">{metadata}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="prose prose-gray max-w-none">
          {content.split('\n').map((paragraph, idx) => (
            paragraph.trim() && <p key={idx} className="mb-3 leading-relaxed text-foreground/90">{paragraph}</p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
