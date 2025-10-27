export interface RegularActivity {
  name: string;
  schedule: string;
  location: string;
}

export interface Contact {
  name: string;
  details: string;
}

export const regularSportsActivities: RegularActivity[] = [
  {
    name: "Männerriege Küttigen",
    schedule: "Donnerstag 19.30 Uhr",
    location: "Stock-Turnhallen"
  },
  {
    name: "Polysport Küttigen",
    schedule: "Donnerstag 20.00 Uhr",
    location: "Turnhalle Dorf"
  },
  {
    name: "Pro Senectute Fitness",
    schedule: "Donnerstag 14.45 Uhr",
    location: "Turnhalle Stock"
  },
  {
    name: "SingWerkstatt Küttigen",
    schedule: "Mittwoch 20.00 Uhr",
    location: "Spittelsaal"
  }
];

export const contactsAndService: Contact[] = [
  {
    name: "Gemeindeverwaltung",
    details: "062 836 10 10"
  },
  {
    name: "Fachstelle Alter",
    details: "Ursula Hürzeler: 079 840 12 45"
  },
  {
    name: "Fahrdienst",
    details: "Maja Kaufmann: 079 156 81 55"
  },
  {
    name: "Notruf",
    details: "Polizei: 117, Feuerwehr: 118"
  }
];
