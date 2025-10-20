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
    <div className="flex items-center justify-between bg-secondary/50 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-3">
        <Label htmlFor="unread-filter" className="flex items-center gap-2 cursor-pointer text-base font-medium">
          {showOnlyUnread ? (
            <Eye className="h-5 w-5 text-accent" />
          ) : (
            <EyeOff className="h-5 w-5 text-muted-foreground" />
          )}
          Nur ungelesene Artikel anzeigen
        </Label>
        <Switch
          id="unread-filter"
          checked={showOnlyUnread}
          onCheckedChange={onToggle}
        />
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-sm">
          {unreadCount} von {totalCount} ungelesen
        </Badge>
      </div>
    </div>
  );
};
