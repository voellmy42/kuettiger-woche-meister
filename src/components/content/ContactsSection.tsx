import { Contact } from "@/data/staticContent";

interface ContactsSectionProps {
  contacts: Contact[];
  title: string;
}

export const ContactsSection = ({
  contacts,
  title
}: ContactsSectionProps) => {
  return (
    <section>
      <div className="bg-card p-6 rounded-lg border border-border">
        <h3 className="font-bold text-xl mb-4 text-primary">{title}</h3>
        <div className="space-y-3 text-sm">
          {contacts.map((contact, index) => (
            <div key={index}>
              <div className="font-semibold">{contact.name}</div>
              <div className="text-muted-foreground">{contact.details}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
