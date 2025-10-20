import { Quote } from "lucide-react";

interface PullQuoteProps {
  text: string;
  author?: string;
}

export const PullQuote = ({ text, author }: PullQuoteProps) => {
  return (
    <div className="my-6 p-6 border-l-4 border-accent bg-muted/30 rounded-r-lg">
      <Quote className="h-8 w-8 text-accent mb-3 opacity-50" />
      <blockquote className="text-xl font-serif italic text-foreground/90 leading-relaxed">
        "{text}"
      </blockquote>
      {author && (
        <p className="mt-3 text-sm font-semibold text-muted-foreground">
          — {author}
        </p>
      )}
    </div>
  );
};
