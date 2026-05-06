export type Topic = {
  id: number;
  title: string;
  category: string;
  icon: string;
  summary: string;
  stories: string[];
  explainerTag: string;
};

export const topics: Topic[] = [
  {
    id: 1,
    title: "When Police Stop You",
    category: "Police",
    icon: "shield",
    summary: "Know your rights during police encounters",
    stories: [
      "Police ask for ID while you're walking home",
      "You're stopped and questioned at the station",
      "You're searched without a clear reason",
      "You're recording an incident and get questioned",
    ],
    explainerTag: "when-the-police-stop-you",
  },
  {
    id: 2,
    title: "Rental Contract Basics",
    category: "Housing",
    icon: "door-open",
    summary: "Understand your rights as a tenant in Germany",
    stories: [
      "Landlord enters without your permission",
      "You're being charged more than 3 months' deposit",
      "You want to make small repairs but aren't sure",
      "You're unsure how to terminate your lease",
    ],
    explainerTag: "rental-contract-basics",
  },
  {
    id: 3,
    title: "Student Work Rights",
    category: "Work",
    icon: "work",
    summary: "Working while studying? Know your legal limits",
    stories: [
      "You exceed 120 full days of work",
      "Your contract includes unpaid trial hours",
      "You're offered a HiWi job - does it count?",
      "You're not paid on time or at all",
    ],
    explainerTag: "student-work-rights",
  },
  {
    id: 4,
    title: "Health Insurance Guide",
    category: "Health",
    icon: "stethoscope",
    summary: "Get covered and stay protected under German law",
    stories: [
      "You turn 30 and need private coverage",
      "You're unsure how to register for public insurance",
      "You visit the doctor but aren't sure what's covered",
      "You're using EHIC as an EU student",
    ],
    explainerTag: "health-insurance-guide",
  },
  {
    id: 5,
    title: "Registering Your Address",
    category: "Visa & Immigration",
    icon: "calendar",
    summary: "How to register your address (Anmeldung) after moving",
    stories: [
      "You're new to Germany and need to register",
      "You just moved apartments",
      "You don't have a landlord confirmation yet",
      "You missed the 14-day deadline",
    ],
    explainerTag: "registering-your-address",
  },
  {
    id: 6,
    title: "Extending Your Residence Permit",
    category: "Visa & Immigration",
    icon: "id-card",
    summary: "Stay legally in Germany by renewing your permit",
    stories: [
      "Your residence permit is about to expire",
      "You're unsure which documents are required",
      "You haven't received an appointment yet",
      "You need a Fiktionsbescheinigung",
    ],
    explainerTag: "extending-your-residence-permit",
  },
  {
    id: 7,
    title: "Changing Universities in Germany",
    category: "Education",
    icon: "book",
    summary: "Switching schools and updating your student status",
    stories: [
      "You want to transfer to a different university",
      "You're confused about Exmatrikulation",
      "You're worried about how it affects your visa",
      "You want to transfer course credits",
    ],
    explainerTag: "changing-universities-in-germany",
  },
  {
    id: 8,
    title: "Debt Collection Letter",
    category: "Consumer Rights",
    icon: "receipt",
    summary: "Understand Inkasso letters, payment pressure, and what to check before paying",
    stories: [
      "You received a payment demand from an Inkasso company",
      "The letter threatens court, seizure, or extra fees",
      "You do not recognize the company or original contract",
      "You need to know what proof to collect before replying",
    ],
    explainerTag: "debt-collection-letter",
  },
];

export function normalizeCategory(input: string) {
  const s = (input || "").toLowerCase();
  if (s.includes("visa") || s.includes("immig")) return "visa & immigration";
  if (s.includes("work") || s.includes("employment")) return "work";
  if (s.includes("police")) return "police";
  if (s.includes("health") || s.includes("insurance")) return "health";
  if (s.includes("education") || s.includes("univer")) return "education";
  if (s.includes("housing") || s.includes("rental") || s.includes("tenant")) return "housing";
  if (s.includes("consumer") || s.includes("debt") || s.includes("inkasso")) return "consumer rights";
  return s.trim();
}

export function displayCategoryLabel(norm: string | null) {
  switch (norm) {
    case "visa & immigration":
      return "Visa & Immigration";
    case "work":
      return "Work";
    case "police":
      return "Police";
    case "health":
      return "Health";
    case "education":
      return "Education";
    case "housing":
      return "Housing";
    case "consumer rights":
      return "Consumer Rights";
    default:
      return null;
  }
}
