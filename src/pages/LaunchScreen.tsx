import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Newspaper } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LaunchScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
            Küttiger Weekly
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Ihre digitale Wochenzeitung für Küttigen
          </p>
        </div>

        {/* Main Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Launch App Option */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate('/app')}>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                <Newspaper className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl">App starten</CardTitle>
              <CardDescription className="text-base">
                Erkunden Sie die neuesten Nachrichten, Veranstaltungen und Informationen aus Küttigen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="lg">
                App öffnen
              </Button>
            </CardContent>
          </Card>

          {/* Newsletter Option */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate('/newsletter')}>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                <Mail className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl">Into My Inbox</CardTitle>
              <CardDescription className="text-base">
                Abonnieren Sie unseren Newsletter und erhalten Sie die wichtigsten Nachrichten direkt in Ihr Postfach
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="lg" variant="outline">
                Newsletter abonnieren
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Küttiger Weekly. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LaunchScreen;
