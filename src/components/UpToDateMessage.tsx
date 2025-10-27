import { Card } from "@/components/ui/card";
import { CheckCircle2, Sparkles } from "lucide-react";

export const UpToDateMessage = () => {
  return (
    <div className="relative overflow-hidden">
      <Card className="border-2 border-accent bg-gradient-to-br from-accent/20 via-accent/10 to-accent/5 p-8 text-center shadow-lg">
        {/* Decorative background elements */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-accent/10 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-accent/10 rounded-full blur-lg animate-float"></div>
        
        <div className="relative flex flex-col items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-lg animate-pulse"></div>
            <CheckCircle2 className="relative h-24 w-24 text-accent drop-shadow-lg" />
            <Sparkles className="h-8 w-8 text-accent absolute -top-2 -right-2 animate-bounce-gentle" />
          </div>
          
          <div className="space-y-3">
            <h3 className="text-4xl font-black text-primary mb-3 gradient-text">
              Du bist Up-to-Date! 🎉
            </h3>
            <p className="text-xl text-muted-foreground font-medium">
              Alle Artikel dieser Woche wurden gelesen. Großartig!
            </p>
          </div>
          
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2 bg-accent/20 rounded-full px-4 py-2">
              <span className="text-lg">📚</span>
              <span className="text-sm font-semibold text-accent">Vollständig gelesen</span>
            </div>
            <div className="flex items-center gap-2 bg-secondary/20 rounded-full px-4 py-2">
              <span className="text-lg">⭐</span>
              <span className="text-sm font-semibold text-secondary">Well done!</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
