import { Separator } from "@/components/ui/separator";
import { CommunityPolls } from "@/components/CommunityPolls";
import { AdvancedEventCalendar } from "@/components/AdvancedEventCalendar";
import { EventsList } from "@/components/EventsList";
import { LeadArticleSection } from "./LeadArticleSection";
import { ArticlesSection } from "./ArticlesSection";
import { RegularActivitiesSection } from "./RegularActivitiesSection";
import { ContactsSection } from "./ContactsSection";
import { Article } from "@/data/articles";
import { Event } from "@/data/events";
import { RegularActivity, Contact } from "@/data/staticContent";

interface MainContentProps {
  articles: Article[];
  readArticles: Set<string>;
  onReadChange: (id: string, isRead: boolean) => void;
  events: Event[];
  regularActivities: RegularActivity[];
  contacts: Contact[];
}

export const MainContent = ({
  articles,
  readArticles,
  onReadChange,
  events,
  regularActivities,
  contacts
}: MainContentProps) => {
  return (
    <div className="space-y-12">
      {/* Lead Story */}
      <LeadArticleSection
        articles={articles}
        readArticles={readArticles}
        onReadChange={onReadChange}
      />

      <Separator className="my-12" />

      {/* Local News Section */}
      <ArticlesSection
        articles={articles}
        readArticles={readArticles}
        onReadChange={onReadChange}
        categoryGroup="lokales"
        title="Lokale Nachrichten"
        subtitle="Aktuelles aus Küttigen"
      />

      {/* Governance Section */}
      <ArticlesSection
        articles={articles}
        readArticles={readArticles}
        onReadChange={onReadChange}
        categoryGroup="politik"
        title="Amtliches"
        subtitle="Aus dem Gemeinderat"
      />

      {/* Sports & Clubs Section */}
      <ArticlesSection
        articles={articles}
        readArticles={readArticles}
        onReadChange={onReadChange}
        categoryGroup="sport"
        title="Sport & Vereine"
        subtitle="Aktiv in Küttigen"
      />

      {/* Church & Social Section */}
      <ArticlesSection
        articles={articles}
        readArticles={readArticles}
        onReadChange={onReadChange}
        categoryGroup="kirche"
        title="Kirche & Soziales"
        subtitle="Gemeinschaft leben"
      />

      {/* Community Polls Section */}
      <section>
        <CommunityPolls />
      </section>

      {/* Event Calendar Section */}
      <section>
        <AdvancedEventCalendar />
      </section>

      {/* Upcoming Events Section */}
      <section>
        <EventsList events={events} />
      </section>

      {/* Regular Sports Activities Section */}
      <RegularActivitiesSection
        activities={regularActivities}
        title="Regelmässige Sportangebote"
      />

      {/* Contacts & Service Section */}
      <ContactsSection
        contacts={contacts}
        title="Kontakte & Service"
      />
    </div>
  );
};
