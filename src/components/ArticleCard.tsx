import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2 } from "lucide-react";
import { ImageGallery } from "@/components/ImageGallery";
import { LocationMap } from "@/components/LocationMap";
import { PullQuote } from "@/components/PullQuote";
import { CommentSection } from "@/components/CommentSection";

interface ArticleCardProps {
  id: string;
  title: string;
  content: string;
  category?: string;
  isLead?: boolean;
  metadata?: string;
  isRead?: boolean;
  onReadChange?: (id: string, isRead: boolean) => void;
  images?: string[];
  location?: string;
  locationAddress?: string;
  pullQuote?: string;
  pullQuoteAuthor?: string;
  enableComments?: boolean;
}

export const ArticleCard = ({ 
  id,
  title, 
  content, 
  category, 
  isLead = false,
  metadata,
  isRead = false,
  onReadChange,
  images,
  location,
  locationAddress,
  pullQuote,
  pullQuoteAuthor,
  enableComments = false
}: ArticleCardProps) => {
  return (
    <Card className={`overflow-hidden transition-all hover:shadow-lg ${
      isLead ? 'border-l-4 border-l-accent' : ''
    } ${isRead ? 'opacity-60' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
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
          </div>
          <div className="flex items-center gap-2 pt-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <Checkbox
                checked={isRead}
                onCheckedChange={(checked) => onReadChange?.(id, checked as boolean)}
                className="h-5 w-5"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {isRead ? (
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
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
      <CardContent>
        {images && images.length > 0 && (
          <ImageGallery images={images} alt={title} />
        )}
        
        <div className="prose prose-gray max-w-none">
          {content.split('\n').map((paragraph, idx) => (
            paragraph.trim() && <p key={idx} className="mb-3 leading-relaxed text-foreground/90">{paragraph}</p>
          ))}
        </div>

        {pullQuote && (
          <PullQuote text={pullQuote} author={pullQuoteAuthor} />
        )}

        {location && (
          <LocationMap location={location} address={locationAddress} />
        )}

        {enableComments && (
          <CommentSection articleId={id} />
        )}
      </CardContent>
    </Card>
  );
};
