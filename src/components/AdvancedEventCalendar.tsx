import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Users, Trash2, Zap, Music, Home } from "lucide-react";

interface Event {
  id: string;
  date: string;
  time: string;
  title: string;
  description?: string;
  location: string;
  type: 'event' | 'sport' | 'garbage' | 'service';
  category: string;
  recurring?: boolean;
  contact?: string;
}

interface AdvancedEventCalendarProps {
  events?: Event[];
}

const defaultEvents: Event[] = [
  // Regular Events
  {
    id: "feuerwehr-uebung",
    date: "2024-10-17",
    time: "19:00",
    title: "Feuerwehr-Hauptübung",
    description: "Demonstration der Bewältigung eines Brandereignisses mit Personenrettung",
    location: "Gewerbehaus Wehrli Holzbau, Hauptstrasse 51",
    type: "event",
    category: "Feuerwehr",
    contact: "Feuerwehr Küttigen"
  },
  {
    id: "kindergarten-einweihung",
    date: "2024-10-25",
    time: "10:00-15:00",
    title: "Einweihung Kindergarten 'Storchennest'",
    description: "Besichtigung des modernen Holzbaus mit musikalischer Begleitung",
    location: "Stock-Areal",
    type: "event",
    category: "Bildung"
  },
  {
    id: "ruebli-maert",
    date: "2024-11-01",
    time: "09:00-14:00",
    title: "Chüttiger Rüeblimärt",
    description: "Traditioneller Markt mit regionalen Produkten",
    location: "Mehrzweckhalle Dorf",
    type: "event",
    category: "Markt"
  },
  {
    id: "orientierungsversammlung",
    date: "2024-11-10",
    time: "19:30",
    title: "Orientierungsversammlung",
    description: "Informationen zur Winter-Gemeindeversammlung",
    location: "Mehrzweckhalle Dorf",
    type: "event",
    category: "Politik"
  },

  // Sports Events
  {
    id: "fc-kuettigen-heim",
    date: "2024-10-19",
    time: "14:30",
    title: "FC Küttigen vs. FC Zofingen",
    description: "2. Liga Regional, Heimspiel",
    location: "Sportplatz Küttigen",
    type: "sport",
    category: "Fussball",
    recurring: true
  },
  {
    id: "handball-damen",
    date: "2024-10-20",
    time: "16:00",
    title: "Handball Damen Küttigen",
    description: "Liga-Spiel gegen Aarau",
    location: "Turnhalle Stock",
    type: "sport",
    category: "Handball"
  },
  {
    id: "volleyball-mixed",
    date: "2024-10-22",
    time: "20:00",
    title: "Volleyball Mixed Turnier",
    description: "Freizeit-Turnier für alle",
    location: "Turnhalle Dorf",
    type: "sport",
    category: "Volleyball",
    contact: "Polysport Küttigen"
  },
  {
    id: "schwimmclub-training",
    date: "2024-10-24",
    time: "19:00",
    title: "Schwimmclub Training",
    description: "Regelmässiges Training für Jugendliche",
    location: "Schwimmbad Küttigen",
    type: "sport",
    category: "Schwimmen",
    recurring: true
  },

  // Garbage Collection
  {
    id: "gruenabfuhr-1",
    date: "2024-10-21",
    time: "06:00",
    title: "Grünabfuhr (Gartenabfälle)",
    description: "Gartenabfälle, Rasenschnitt, Laub",
    location: "Ganzer Ort",
    type: "garbage",
    category: "Entsorgung",
    recurring: true
  },
  {
    id: "papiersammlung-1",
    date: "2024-10-18",
    time: "06:00",
    title: "Papiersammlung",
    description: "Altpapier und Karton bereitstellen",
    location: "Ganzer Ort",
    type: "garbage",
    category: "Entsorgung",
    recurring: true
  },
  {
    id: "kehricht-1",
    date: "2024-10-23",
    time: "06:00",
    title: "Kehrichtabfuhr",
    description: "Hausmüll in Kehrichtsäcken",
    location: "Ganzer Ort",
    type: "garbage",
    category: "Entsorgung",
    recurring: true
  },
  {
    id: "altmetall-1",
    date: "2024-10-22",
    time: "06:00",
    title: "Altmetall-Sammlung",
    description: "An der Kehrichtabfuhr-Route",
    location: "Ganzer Ort",
    type: "garbage",
    category: "Entsorgung"
  },
  {
    id: "popup-recycling",
    date: "2024-10-25",
    time: "08:30-11:30",
    title: "Pop-up-Recycling",
    description: "Elektroschrott, Batterien, Sonderabfälle",
    location: "Parkplatz Sandfelsen",
    type: "garbage",
    category: "Entsorgung"
  },

  // Services
  {
    id: "rechtsauskunft",
    date: "2024-10-21",
    time: "19:00-20:00",
    title: "Rechtsauskunft optional",
    description: "Kostenlose Rechtsberatung",
    location: "Gemeindehaus",
    type: "service",
    category: "Beratung",
    recurring: true
  },
  {
    id: "fachstelle-alter",
    date: "2024-10-23",
    time: "09:00-12:00",
    title: "Fachstelle Alter",
    description: "Sprechstunde für Senioren",
    location: "Gemeindehaus",
    type: "service",
    category: "Soziales",
    contact: "Ursula Hürzeler: 079 840 12 45",
    recurring: true
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'sport': return <Zap className="h-4 w-4" />;
    case 'garbage': return <Trash2 className="h-4 w-4" />;
    case 'service': return <Home className="h-4 w-4" />;
    case 'event': return <Calendar className="h-4 w-4" />;
    default: return <Calendar className="h-4 w-4" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'sport': return 'bg-green-100 text-green-800 border-green-200';
    case 'garbage': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'service': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'event': return 'bg-purple-100 text-purple-800 border-purple-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const AdvancedEventCalendar = ({ events = defaultEvents }: AdvancedEventCalendarProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Get next 30 days
  const upcomingDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  }, []);

  const filteredEvents = useMemo(() => {
    let filtered = events;
    
    if (activeTab !== "all") {
      filtered = filtered.filter(event => event.type === activeTab);
    }
    
    if (selectedDate) {
      filtered = filtered.filter(event => event.date === selectedDate);
    }
    
    return filtered.sort((a, b) => {
      const dateA = new Date(a.date + 'T' + (a.time.split('-')[0] || a.time));
      const dateB = new Date(b.date + 'T' + (b.time.split('-')[0] || b.time));
      return dateA.getTime() - dateB.getTime();
    });
  }, [events, activeTab, selectedDate]);

  const eventsByDate = useMemo(() => {
    const grouped: Record<string, Event[]> = {};
    filteredEvents.forEach(event => {
      if (!grouped[event.date]) {
        grouped[event.date] = [];
      }
      grouped[event.date].push(event);
    });
    return grouped;
  }, [filteredEvents]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-CH', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const formatFullDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-CH', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-900">
          <Calendar className="h-5 w-5" />
          Veranstaltungskalender
          <Badge variant="secondary" className="ml-auto bg-green-100 text-green-800">
            {filteredEvents.length} Termine
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">Alle</TabsTrigger>
            <TabsTrigger value="event">Events</TabsTrigger>
            <TabsTrigger value="sport">Sport</TabsTrigger>
            <TabsTrigger value="garbage">Entsorgung</TabsTrigger>
            <TabsTrigger value="service">Service</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <div className="space-y-4">
              {/* Date Selector */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {upcomingDates.slice(0, 14).map((date) => (
                  <Button
                    key={date}
                    variant={selectedDate === date ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDate(selectedDate === date ? "" : date)}
                    className="whitespace-nowrap"
                  >
                    {formatDate(date)}
                  </Button>
                ))}
                <Button
                  variant={selectedDate === "" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDate("")}
                  className="whitespace-nowrap"
                >
                  Alle
                </Button>
              </div>

              {/* Events List */}
              {Object.keys(eventsByDate).length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Keine Termine für diesen Zeitraum gefunden.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {Object.entries(eventsByDate).map(([date, dayEvents]) => (
                    <div key={date} className="border border-gray-200 rounded-lg p-4 bg-white">
                      <h3 className="font-semibold text-lg mb-3 text-gray-900 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        {formatFullDate(date)}
                        <Badge variant="outline" className="ml-auto">
                          {dayEvents.length} Termin{dayEvents.length !== 1 ? 'e' : ''}
                        </Badge>
                      </h3>
                      
                      <div className="space-y-3">
                        {dayEvents.map((event) => (
                          <div key={event.id} className="border-l-4 border-l-primary pl-4 py-2">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  {getTypeIcon(event.type)}
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs ${getTypeColor(event.type)}`}
                                  >
                                    {event.category}
                                  </Badge>
                                  {event.recurring && (
                                    <Badge variant="secondary" className="text-xs">
                                      Regelmässig
                                    </Badge>
                                  )}
                                </div>
                                <h4 className="font-medium text-gray-900 mb-1">
                                  {event.title}
                                </h4>
                                {event.description && (
                                  <p className="text-sm text-gray-600 mb-2">
                                    {event.description}
                                  </p>
                                )}
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {event.time}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {event.location}
                                  </div>
                                  {event.contact && (
                                    <div className="flex items-center gap-1">
                                      <Users className="h-3 w-3" />
                                      {event.contact}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
