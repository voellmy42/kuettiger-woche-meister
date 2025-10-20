import { Card } from "@/components/ui/card";
import { CheckCircle2, Sparkles } from "lucide-react";

export const UpToDateMessage = () => {
  return (
    <Card className="border-2 border-accent bg-gradient-to-br from-accent/10 to-accent/5 p-8 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <CheckCircle2 className="h-20 w-20 text-accent" />
          <Sparkles className="h-6 w-6 text-accent absolute -top-1 -right-1 animate-pulse" />
        </div>
        <div>
          <h3 className="text-3xl font-bold text-primary mb-2">
            Du bist Up-to-Date!
          </h3>
          <p className="text-lg text-muted-foreground">
            Alle Artikel dieser Woche wurden gelesen. Großartig!
          </p>
        </div>
      </div>
    </Card>
  );
};
