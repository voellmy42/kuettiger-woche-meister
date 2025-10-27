import { ArticleCard } from "@/components/ArticleCard";
import { Article } from "@/data/articles";

interface LeadArticleSectionProps {
  articles: Article[];
  readArticles: Set<string>;
  onReadChange: (id: string, isRead: boolean) => void;
}

export const LeadArticleSection = ({
  articles,
  readArticles,
  onReadChange
}: LeadArticleSectionProps) => {
  const leadArticle = articles.find(a => a.isLead);
  
  if (!leadArticle) {
    return null;
  }

  return (
    <section className="mb-12">
      <ArticleCard
        {...leadArticle}
        isRead={readArticles.has(leadArticle.id)}
        onReadChange={onReadChange}
      />
    </section>
  );
};
