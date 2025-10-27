import { ArticleCard } from "@/components/ArticleCard";
import { SectionHeader } from "@/components/SectionHeader";
import { Separator } from "@/components/ui/separator";
import { Article } from "@/data/articles";

interface ArticlesSectionProps {
  articles: Article[];
  readArticles: Set<string>;
  onReadChange: (id: string, isRead: boolean) => void;
  categoryGroup: string;
  title: string;
  subtitle: string;
}

export const ArticlesSection = ({
  articles,
  readArticles,
  onReadChange,
  categoryGroup,
  title,
  subtitle
}: ArticlesSectionProps) => {
  const filteredArticles = articles.filter(a => a.categoryGroup === categoryGroup);
  
  if (filteredArticles.length === 0) {
    return null;
  }

  return (
    <>
      <section>
        <SectionHeader title={title} subtitle={subtitle} />
        <div className="space-y-6">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              {...article}
              isRead={readArticles.has(article.id)}
              onReadChange={onReadChange}
            />
          ))}
        </div>
      </section>
      <Separator />
    </>
  );
};
