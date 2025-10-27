import { RegularActivity } from "@/data/staticContent";

interface RegularActivitiesSectionProps {
  activities: RegularActivity[];
  title: string;
}

export const RegularActivitiesSection = ({
  activities,
  title
}: RegularActivitiesSectionProps) => {
  return (
    <section>
      <div className="bg-card p-6 rounded-lg border border-border">
        <h3 className="font-bold text-xl mb-4 text-primary">{title}</h3>
        <div className="space-y-3 text-sm">
          {activities.map((activity, index) => (
            <div key={index}>
              <div className="font-semibold">{activity.name}</div>
              <div className="text-muted-foreground">
                {activity.schedule} - {activity.location}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
