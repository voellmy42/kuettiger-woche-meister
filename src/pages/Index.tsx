import { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/Header";
import { ArticleCard } from "@/components/ArticleCard";
import { SectionHeader } from "@/components/SectionHeader";
import { EventsList } from "@/components/EventsList";
import { ArticleNav } from "@/components/ArticleNav";
import { ReadFilter } from "@/components/ReadFilter";
import { UpToDateMessage } from "@/components/UpToDateMessage";
import { Separator } from "@/components/ui/separator";

interface Article {
  id: string;
  category: string;
  categoryGroup: string;
  title: string;
  content: string;
  isLead?: boolean;
  images?: string[];
  location?: string;
  locationAddress?: string;
  pullQuote?: string;
  pullQuoteAuthor?: string;
  enableComments?: boolean;
}

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

  const upcomingEvents = [
    { date: "Freitag, 17. Oktober", title: "Feuerwehr-Hauptübung", time: "19:00 Uhr", location: "Gewerbehaus Wehrli Holzbau" },
    { date: "Samstag, 18. Oktober", title: "Papiersammlung", time: "Ganztägig" },
    { date: "Samstag, 25. Oktober", title: "Einweihung Kindergarten 'Storchennest'", time: "10:00 - 15:00 Uhr", location: "Stock-Areal" },
    { date: "Samstag, 1. November", title: "Chüttiger Rüeblimärt", time: "09:00 - 14:00 Uhr", location: "Mehrzweckhalle Dorf" },
    { date: "Montag, 10. November", title: "Orientierungsversammlung", time: "19:30 Uhr", location: "Mehrzweckhalle Dorf" },
  ];

  const allArticles: Article[] = [
    {
      id: "knuesel-praesident",
      category: "Politik",
      categoryGroup: "politik",
      title: "Markus Knüsel ist neuer Gemeindepräsident",
      content: `Küttigen hat gewählt. Markus Knüsel (SVP) wird ab dem Jahreswechsel das Amt des Gemeindepräsidenten übernehmen. Er bedankt sich herzlich bei den Wählerinnen und Wählern für das entgegengebrachte Vertrauen.

In seiner Dankesrede drückte Knüsel seine Freude und seinen Optimismus für die Zukunft der Gemeinde aus. "Ich freue mich, dieses ehrenvolle Amt zum Jahreswechsel antreten zu dürfen und bin frohen Mutes für die Zukunft von Küttigen", so der neugewählte Präsident. Seine erste Amtshandlung wird die Begrüssung der Bürgerinnen und Bürger am traditionellen Neujahrsapéro im Küttiger Spittel sein, zu der er bereits jetzt herzlich einlädt.`,
      isLead: true,
      images: ["https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&h=500&fit=crop"],
      pullQuote: "Ich freue mich, dieses ehrenvolle Amt zum Jahreswechsel antreten zu dürfen und bin frohen Mutes für die Zukunft von Küttigen",
      pullQuoteAuthor: "Markus Knüsel, neugewählter Gemeindepräsident",
      enableComments: true,
    },
    {
      id: "kindergarten-einweihung",
      category: "Bildung",
      categoryGroup: "lokales",
      title: "Einweihung des Kindergartens 'Storchennest' am 25. Oktober",
      content: `Nach rund einem Jahr Bauzeit ist es so weit: Der neue Mehrfachkindergarten mit integrierter Tagesstruktur auf dem Stock-Areal konnte nach den Sommerferien erfolgreich in Betrieb genommen werden. Nun lädt der Gemeinderat die gesamte Bevölkerung zur offiziellen Einweihungsfeier ein.

Am Samstag, 25. Oktober 2025, haben alle Interessierten von 10.00 bis 15.00 Uhr die Möglichkeit, den modernen Holzbau aus heimischen Wäldern zu besichtigen. Die offizielle Feier mit musikalischer Begleitung und einer kleinen Verpflegung findet um 11.00 Uhr statt. Ein attraktives Rahmenprogramm für Gross und Klein rundet den Tag ab.`,
      images: ["https://images.unsplash.com/photo-1587049352846-4a222e784422?w=800&h=500&fit=crop", "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop"],
      location: "Kindergarten Storchennest",
      locationAddress: "Stock-Areal, Küttigen",
      enableComments: true,
    },
    {
      id: "sporthalle-name",
      category: "Infrastruktur",
      categoryGroup: "lokales",
      title: "Name für neue Sporthalle und Musikschule gesucht",
      content: `In rund einem Jahr werden die neue Doppelturnhalle und die Musikschule im Stock bezogen. Doch ein wichtiger Bestandteil fehlt noch: ein passender Name. Die Baubegleitkommission ruft die Bevölkerung auf, kreativ zu werden.

Gesucht wird ein kurzer und einprägsamer Name für das neue Gebäude. Vorschläge können noch bis Ende Oktober per E-Mail an zentraledienste@kuettigen.ch gesendet oder direkt im Foyer des Gemeindehauses auf ein dafür vorgesehenes Plakat geschrieben werden. Alle sind eingeladen, sich an der Namensfindung zu beteiligen. Der Gemeinderat wird Ende des Jahres den definitiven Namen auswählen.`,
    },
    {
      id: "trinkwasser-qualitaet",
      category: "Versorgung",
      categoryGroup: "lokales",
      title: "Küttiger Trinkwasser in einwandfreiem Zustand",
      content: `Gute Nachrichten für alle Haushalte: Die Qualität des Küttiger Trinkwassers ist ausgezeichnet. Dies bestätigen die Laborergebnisse von Proben, die am 13. August an neun verschiedenen Stellen im Dorf entnommen wurden.

Die Abteilung Bau teilt mit, dass sämtliche Proben die hygienisch-mikrobiologischen Anforderungen der Hygieneverordnung erfüllen. Auch das Fischbachquellwasser, das die Brunnen an der Benkenstrasse und an der Vorstadtstrasse speist, wurde geprüft und für einwandfrei befunden.`,
    },
    {
      id: "pack-paeckli",
      category: "Soziales",
      categoryGroup: "lokales",
      title: "Weihnachts-Aktion 'Pack es Päckli'",
      content: `Die Adventszeit rückt näher und damit auch die Gelegenheit, Gutes zu tun. Die Aktion "Pack es Päckli" von ADRA sammelt Weihnachtsgeschenke für Kinder, die in Moldawien in ärmsten Verhältnissen leben.

Wer sich an der Aktion beteiligen möchte, kann sich einen speziellen ADRA-Karton besorgen, diesen mit Geschenken füllen und wieder abgeben. Die offizielle Abhol- und Abgabestelle in Küttigen ist die Zahnarztpraxis Bornand an der Hauptstrasse 58d während der Öffnungszeiten.`,
    },
    {
      id: "orientierungsversammlung",
      category: "Gemeindeversammlung",
      categoryGroup: "politik",
      title: "Orientierungsversammlung zur Winter-Gemeindeversammlung",
      content: `Am Montag, 10. November 2025, um 19.30 Uhr, lädt der Gemeinderat alle stimmberechtigten Küttigerinnen und Küttiger zu einer Orientierungsversammlung in der Mehrzweckhalle Dorf ein. Informiert wird über die Traktanden der bevorstehenden Winter-Gemeindeversammlung.

Schwerpunkte sind das Strassenbauprojekt inklusive der Sanierung der Bushaltestellen Stock (Abschnitt Höhleweg bis Sonnmattstrasse) sowie Folgeprojekte im Zusammenhang mit dem Neubau der Doppelturnhalle und Musikschule.`,
    },
    {
      id: "verwaltung-geschlossen",
      category: "Verwaltung",
      categoryGroup: "politik",
      title: "Verwaltung am 23. Oktober geschlossen",
      content: `Die Gemeindeverwaltung Küttigen bleibt am Donnerstag, 23. Oktober 2025, aufgrund eines umfassenden EDV-Software-Updates ganztägig geschlossen. Viele Dienstleistungen können jedoch weiterhin online über das "Smart Service Portal" des Kantons Aargau genutzt werden. Ab Freitag, 24. Oktober, ist die Verwaltung wieder zu den gewohnten Zeiten erreichbar.`,
    },
    {
      id: "feuerwehr-uebung",
      category: "Feuerwehr",
      categoryGroup: "politik",
      title: "Feuerwehr-Hauptübung am 17. Oktober",
      content: `Die Feuerwehr Küttigen lädt die Bevölkerung herzlich zur diesjährigen Hauptübung ein. Diese findet am Freitag, 17. Oktober 2025, von 19.00 bis 20.00 Uhr beim Gewerbehaus Wehrli Holzbau an der Hauptstrasse 51 statt. Demonstriert wird die Bewältigung eines Brandereignisses mit Personenrettung. Die Angehörigen der Feuerwehr freuen sich auf zahlreiche Zuschauer.`,
      images: ["https://images.unsplash.com/photo-1583445095369-9c651e7e5d34?w=800&h=500&fit=crop"],
      location: "Gewerbehaus Wehrli Holzbau",
      locationAddress: "Hauptstrasse 51, Küttigen",
    },
    {
      id: "landfraue-erntedank",
      category: "Vereine",
      categoryGroup: "sport",
      title: "Chüttiger Landfraue: Von Erntedank bis Rüeblimärt",
      content: `Die Chüttiger Landfraue sind im Herbst besonders aktiv. Am Sonntag, 19. Oktober, schmücken sie die Kirche für den Erntedankgottesdienst und organisieren den anschliessenden Brot- und Gemüseverkauf. Am Freitag, 24. Oktober, wird ab 17 Uhr gemeinsam im Bachhüsli gebacken.

Ein Highlight ist der traditionelle "Chüttiger Rüeblimärt" am Samstag, 1. November, in der Mehrzweckhalle Dorf, gefolgt vom Aarauer Rüeblimärt am Mittwoch, 5. November.`,
    },
    {
      id: "wildessen-schuetzen",
      category: "Gastronomie",
      categoryGroup: "sport",
      title: "Schützen laden zum Wildessen",
      content: `Die Schützengesellschaft Densbüren Asp lädt am Wochenende vom 25. und 26. Oktober zum traditionellen Wildessen ins Schützenhaus Büelhalde ein. Serviert werden Köstlichkeiten wie Rehpfeffer und Wildsauragout mit Beilagen. Geöffnet ist am Samstag von 8.00 bis 22.00 Uhr und am Sonntag von 11.00 bis 14.00 Uhr.`,
      images: ["https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=500&fit=crop"],
      location: "Schützenhaus Büelhalde",
      locationAddress: "Densbüren Asp",
    },
    {
      id: "raclette-singwerkstatt",
      category: "Musik",
      categoryGroup: "sport",
      title: "SingWerkstatt veranstaltet Raclette-Plausch",
      content: `Für alle Käseliebhaber veranstaltet die SingWerkstatt Küttigen am 24. und 25. Oktober einen gemütlichen Raclette-Plausch im Spittel. Am Freitagabend sorgt "Elvesto" ab 20 Uhr für musikalische Unterhaltung. Die SingWerkstatt probt übrigens jeden Mittwochabend um 20 Uhr im Spittelsaal und freut sich jederzeit über neue Sängerinnen und Sänger.`,
    },
    {
      id: "schwimmtalente-badi",
      category: "Schwimmen",
      categoryGroup: "sport",
      title: "Badikommission ehrt junge Schwimmtalente",
      content: `Die Badikommission gratuliert allen Kindern, die in der vergangenen Saison den Halbmarathon geschwommen sind. Ein besonderer Dank und eine nachträgliche Erwähnung gehen an Mona, Lina, Finn und Timo Thut sowie Elisa Herrigel für ihre grossartigen Leistungen.`,
    },
    {
      id: "kirche-gottesdienste",
      category: "Kirche",
      categoryGroup: "kirche",
      title: "Kirchgemeinden laden zu Gottesdiensten und Anlässen",
      content: `Die lokalen Kirchgemeinden bieten ein vielfältiges Programm für alle Altersgruppen.

Die Reformierte Kirche Kirchberg lädt am Sonntag, 19. Oktober, um 9.30 Uhr zum festlichen Erntedankgottesdienst ein, musikalisch umrahmt von der Alphorngruppe Biberstein. Ein besonderes Ereignis ist die feierliche Amtseinsetzung von Pfarrer Marco Jaeschke am Sonntag, 9. November, um 9.30 Uhr.

Die Katholische Pfarrei Peter und Paul lädt regelmässig zu Wortgottesdiensten mit Kommunionfeier ein. Das "Café Paula" ist jeweils freitags und donnerstags von 14 bis 17 Uhr ein offener Treffpunkt.`,
    },
    {
      id: "seniorennachmittag",
      category: "Senioren",
      categoryGroup: "kirche",
      title: "Ökumenischer Seniorennachmittag",
      content: `Am Mittwoch, 5. November, um 14.15 Uhr, findet in der Mehrzweckhalle Küttigen der ökumenische Seniorennachmittag statt. Reinhard Bönig gibt einen Einblick in "Das Bergbauern- und Älplerleben". Für den Transport wird ein Extrabus organisiert. Anmeldung ist bis zum 31. Oktober erforderlich.`,
    },
    {
      id: "klimaplattform-biodiversitaet",
      category: "Umwelt",
      categoryGroup: "kirche",
      title: "Klimaplattform gibt Tipp für mehr Biodiversität",
      content: `Die Klimaplattform Küttigen-Rombach-Biberstein (KRB) gibt in ihrer Tipp-Reihe Ratschläge für ein nachhaltigeres Leben. Tipp #14 richtet sich an Bewohner von Mehrfamilienhäusern: Ein Insektenhotel auf dem Balkon aufzustellen, hilft den Nützlingen. Wichtig sei aber auch, für ein entsprechendes Nahrungsangebot in Form von bienenfreundlichen Pflanzen zu sorgen.`,
    },
    {
      id: "stellenangebot-wasserflue",
      category: "Stellenangebot",
      categoryGroup: "kirche",
      title: "Stellenausschreibung im Seniorenzentrum Wasserflue",
      content: `Das Seniorenzentrum Wasserflue sucht per Anfang 2026 eine/n Sekretär/in des Stiftungsrates. Die Nebentätigkeit umfasst die Protokollierung von 6-8 Abendsitzungen pro Jahr sowie weitere administrative Aufgaben. Interessierte können sich bis zum 31. Oktober 2025 bei der Präsidentin des Stiftungsrats, Katrin Stetter Widmer, per E-Mail melden: katrin.stetter@wasserflue.ch.`,
    },
  ];

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
        counts[article.categoryGroup]++;
      }
    });

    return counts;
  }, [readArticles]);

  const allRead = readArticles.size === allArticles.length;
  const showUpToDate = allRead && activeCategory === "alle" && !showOnlyUnread;

  return (
    <div className="min-h-screen">
      <Header />
      
      <ArticleNav 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        unreadCounts={unreadCounts}
      />

      <main className="container mx-auto px-4 py-8">
        <ReadFilter
          showOnlyUnread={showOnlyUnread}
          onToggle={setShowOnlyUnread}
          unreadCount={unreadCounts.alle}
          totalCount={allArticles.length}
        />

        {showUpToDate && (
          <UpToDateMessage />
        )}

        {!showUpToDate && filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              Keine {showOnlyUnread ? "ungelesenen " : ""}Artikel in dieser Kategorie.
            </p>
          </div>
        )}

        {!showUpToDate && filteredArticles.length > 0 && (
          <>
            {/* Lead Story */}
            {filteredArticles.find((a) => a.isLead) && (
              <section className="mb-12">
                <ArticleCard
                  {...filteredArticles.find((a) => a.isLead)!}
                  isRead={readArticles.has(filteredArticles.find((a) => a.isLead)!.id)}
                  onReadChange={handleReadChange}
                />
              </section>
            )}

            <Separator className="my-12" />

            {/* Two-column layout for main content */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-12">
                {/* Local News Section */}
                {filteredArticles.filter((a) => !a.isLead && a.categoryGroup === "lokales").length > 0 && (
                  <>
                    <section>
                      <SectionHeader title="Lokale Nachrichten" subtitle="Aktuelles aus Küttigen" />
                      <div className="space-y-6">
                        {filteredArticles
                          .filter((a) => !a.isLead && a.categoryGroup === "lokales")
                          .map((article) => (
                            <ArticleCard
                              key={article.id}
                              {...article}
                              isRead={readArticles.has(article.id)}
                              onReadChange={handleReadChange}
                            />
                          ))}
                      </div>
                    </section>
                    <Separator />
                  </>
                )}

                {/* Governance Section */}
                {filteredArticles.filter((a) => !a.isLead && a.categoryGroup === "politik").length > 0 && (
                  <>
                    <section>
                      <SectionHeader title="Amtliches" subtitle="Aus dem Gemeinderat" />
                      <div className="space-y-6">
                        {filteredArticles
                          .filter((a) => !a.isLead && a.categoryGroup === "politik")
                          .map((article) => (
                            <ArticleCard
                              key={article.id}
                              {...article}
                              isRead={readArticles.has(article.id)}
                              onReadChange={handleReadChange}
                            />
                          ))}
                      </div>
                    </section>
                    <Separator />
                  </>
                )}

                {/* Sports & Clubs Section */}
                {filteredArticles.filter((a) => a.categoryGroup === "sport").length > 0 && (
                  <>
                    <section>
                      <SectionHeader title="Sport & Vereine" subtitle="Aktiv in Küttigen" />
                      <div className="space-y-6">
                        {filteredArticles
                          .filter((a) => a.categoryGroup === "sport")
                          .map((article) => (
                            <ArticleCard
                              key={article.id}
                              {...article}
                              isRead={readArticles.has(article.id)}
                              onReadChange={handleReadChange}
                            />
                          ))}
                      </div>
                    </section>
                    <Separator />
                  </>
                )}

                {/* Church & Social Section */}
                {filteredArticles.filter((a) => a.categoryGroup === "kirche").length > 0 && (
                  <section>
                    <SectionHeader title="Kirche & Soziales" subtitle="Gemeinschaft leben" />
                    <div className="space-y-6">
                      {filteredArticles
                        .filter((a) => a.categoryGroup === "kirche")
                        .map((article) => (
                          <ArticleCard
                            key={article.id}
                            {...article}
                            isRead={readArticles.has(article.id)}
                            onReadChange={handleReadChange}
                          />
                        ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Sidebar */}
              <aside className="space-y-8">
                <EventsList events={upcomingEvents} />

                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="font-bold text-xl mb-4 text-primary">Entsorgung & Sammlungen</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-semibold">Papiersammlung</div>
                      <div className="text-muted-foreground">Samstag, 18. Oktober - Bereitstellung bis 7.30 Uhr</div>
                    </div>
                    <div>
                      <div className="font-semibold">Altmetall-Sammlung</div>
                      <div className="text-muted-foreground">Mittwoch, 22. Oktober - An Kehrichtabfuhr-Route</div>
                    </div>
                    <div>
                      <div className="font-semibold">Pop-up-Recycling</div>
                      <div className="text-muted-foreground">Samstag, 25. Oktober, 8.30-11.30 Uhr - Parkplatz Sandfelsen</div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="font-bold text-xl mb-4 text-primary">Sportangebote</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-semibold">Männerriege Küttigen</div>
                      <div className="text-muted-foreground">Donnerstag 19.30 Uhr - Stock-Turnhallen</div>
                    </div>
                    <div>
                      <div className="font-semibold">Polysport Küttigen</div>
                      <div className="text-muted-foreground">Donnerstag 20.00 Uhr - Turnhalle Dorf</div>
                    </div>
                    <div>
                      <div className="font-semibold">Pro Senectute Fitness</div>
                      <div className="text-muted-foreground">Donnerstag 14.45 Uhr - Turnhalle Stock</div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="font-bold text-xl mb-4 text-primary">Service</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-semibold">Rechtsauskunft</div>
                      <div className="text-muted-foreground">Dienstag, 21. Okt., 19-20 Uhr - Gemeindehaus</div>
                    </div>
                    <div>
                      <div className="font-semibold">Fachstelle Alter</div>
                      <div className="text-muted-foreground">Ursula Hürzeler: 079 840 12 45</div>
                    </div>
                    <div>
                      <div className="font-semibold">Fahrdienst</div>
                      <div className="text-muted-foreground">Maja Kaufmann: 079 156 81 55</div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </>
        )}
      </main>

      <footer className="bg-primary text-primary-foreground mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-2">Küttiger Weekly</p>
          <p className="text-sm opacity-80">Ihre digitale Wochenzeitung für Küttigen</p>
          <p className="text-xs opacity-60 mt-4">© {new Date().getFullYear()} Küttiger Weekly. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
