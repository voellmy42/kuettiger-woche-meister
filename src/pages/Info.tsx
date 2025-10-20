import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AdvancedEventCalendar } from "@/components/AdvancedEventCalendar";
import { EventsList } from "@/components/EventsList";

export default function Info() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Custom navigation for Info page */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border mb-8">
        <div className="container mx-auto px-4">
          <div className="py-4">
            <div className="flex items-center gap-2">
              <Link to="/">
                <Button variant="ghost" className="whitespace-nowrap">
                  ← Zurück zur Hauptseite
                </Button>
              </Link>
              <div className="flex-1" />
              <div className="text-sm text-muted-foreground">
                Infos & Termine
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <h1 className="text-3xl font-bold">Infos & Termine</h1>
        <AdvancedEventCalendar />
        <EventsList events={[]} />
      </main>
    </div>
  );
}