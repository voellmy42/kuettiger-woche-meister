import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff } from "lucide-react";

interface ReadFilterProps {
  showOnlyUnread: boolean;
  onToggle: (value: boolean) => void;
  unreadCount: number;
  totalCount: number;
}

export const ReadFilter = ({ showOnlyUnread, onToggle, unreadCount, totalCount }: ReadFilterProps) => {
  return (
    <div className="card-modern p-6 mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${showOnlyUnread ? 'bg-accent/20' : 'bg-muted'}`}>
              {showOnlyUnread ? (
                <Eye className="h-5 w-5 text-accent" />
              ) : (
                <EyeOff className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <Label htmlFor="unread-filter" className="cursor-pointer text-base font-semibold">
              Nur ungelesene Artikel anzeigen
            </Label>
          </div>
          <Switch
            id="unread-filter"
            checked={showOnlyUnread}
            onCheckedChange={onToggle}
            className="data-[state=checked]:bg-accent"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-muted rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-muted-foreground">
              {unreadCount} von {totalCount} ungelesen
            </span>
          </div>
          
          {unreadCount > 0 && (
            <Badge className="bg-accent text-accent-foreground px-3 py-1 text-sm font-bold animate-bounce-gentle">
              {unreadCount} neu
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};
