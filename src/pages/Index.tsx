import { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/Header";
import { ArticleNav } from "@/components/ArticleNav";
import { ReadFilter } from "@/components/ReadFilter";
import { UpToDateMessage } from "@/components/UpToDateMessage";
import { MainContent } from "@/components/content";
import { allArticles, Article, upcomingEvents, regularSportsActivities, contactsAndService } from "@/data";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("alle");
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);
  const [readArticles, setReadArticles] = useState<Set<string>>(new Set());

  // Load read articles from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("kuettiger-weekly-read");
    if (saved) {
      setReadArticles(new Set(JSON.parse(saved)));
    }
  }, []);

  // Save read articles to localStorage
  useEffect(() => {
    localStorage.setItem("kuettiger-weekly-read", JSON.stringify(Array.from(readArticles)));
  }, [readArticles]);

  const handleReadChange = (id: string, isRead: boolean) => {
    setReadArticles((prev) => {
      const next = new Set(prev);
      if (isRead) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };


  // Filter articles based on category and read status
  const filteredArticles = useMemo(() => {
    let filtered = allArticles;

    // Filter by category
    if (activeCategory !== "alle") {
      filtered = filtered.filter((a) => a.categoryGroup === activeCategory);
    }

    // Filter by read status
    if (showOnlyUnread) {
      filtered = filtered.filter((a) => !readArticles.has(a.id));
    }

    return filtered;
  }, [activeCategory, showOnlyUnread, readArticles]);

  // Calculate unread counts per category
  const unreadCounts = useMemo(() => {
    const counts: Record<string, number> = {
      alle: 0,
      politik: 0,
      lokales: 0,
      sport: 0,
      kirche: 0,
    };

    allArticles.forEach((article) => {
      if (!readArticles.has(article.id)) {
        counts.alle++;
        if (counts[article.categoryGroup] !== undefined) {
          counts[article.categoryGroup]++;
        }
      }
    });

    return counts;
  }, [readArticles]);

  const allRead = readArticles.size === allArticles.length;
  const showUpToDate = allRead && activeCategory === "alle" && !showOnlyUnread;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Header />
      
      <ArticleNav 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        unreadCounts={unreadCounts}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <ReadFilter
            showOnlyUnread={showOnlyUnread}
            onToggle={setShowOnlyUnread}
            unreadCount={unreadCounts.alle}
            totalCount={allArticles.length}
          />
        </div>

        {showUpToDate && (
          <div className="mb-8">
            <UpToDateMessage />
          </div>
        )}

        {!showUpToDate && filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-muted rounded-full mb-6">
              <span className="text-3xl">📰</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Keine Artikel gefunden
            </h3>
            <p className="text-lg text-muted-foreground">
              Keine {showOnlyUnread ? "ungelesenen " : ""}Artikel in dieser Kategorie.
            </p>
          </div>
        )}

        {!showUpToDate && filteredArticles.length > 0 && (
          <MainContent
            articles={filteredArticles}
            readArticles={readArticles}
            onReadChange={handleReadChange}
            events={upcomingEvents}
            regularActivities={regularSportsActivities}
            contacts={contactsAndService}
          />
        )}
      </main>

      <footer className="relative mt-20 py-12 bg-gradient-to-r from-primary via-secondary to-accent text-white overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="mb-6">
            <h3 className="text-3xl font-bold mb-2">Küttiger Weekly</h3>
            <p className="text-lg opacity-90">Ihre digitale Wochenzeitung für Küttigen</p>
          </div>
          
          <div className="flex justify-center gap-6 mb-6">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-sm">📱</span>
              <span className="text-sm font-medium">Immer aktuell</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-sm">🌍</span>
              <span className="text-sm font-medium">Lokal & digital</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-sm">💚</span>
              <span className="text-sm font-medium">Nachhaltig</span>
            </div>
          </div>
          
          <p className="text-sm opacity-70">
            © {new Date().getFullYear()} Küttiger Weekly. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;