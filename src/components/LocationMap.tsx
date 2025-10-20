import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

interface LocationMapProps {
  location: string;
  address?: string;
}

export const LocationMap = ({ location, address }: LocationMapProps) => {
  return (
    <Card className="p-4 my-4 bg-muted/30">
      <div className="flex items-start gap-3">
        <MapPin className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
        <div>
          <p className="font-semibold text-sm">{location}</p>
          {address && <p className="text-sm text-muted-foreground">{address}</p>}
        </div>
      </div>
    </Card>
  );
};
