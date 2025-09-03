// TypeScript interfaces
export interface Step {
  icon?: string;           // key from iconMap.tsx (e.g., "id-card", "calendar")
  title: string;
  detail: string;
  source?: string;
}

export interface GuidanceStep {
  icon?: string;           // key from iconMap.tsx
  title: string;
  detail: string;
}

export interface Explainer {
  steps: Step[];
  guidance?: GuidanceStep[];
}

export interface ExplainerSteps {
  [title: string]: Explainer;
}

// Actual content
const explainerSteps: ExplainerSteps = {
  "When the Police Stop You": {
    steps: [
      {
        icon: "id-card",
        title: "You are required to show ID when asked (especially if you're not an EU citizen)",
        detail:
          "According to German residency law (§ 48 AufenthG), non-EU citizens must carry and show identification documents on request. Failing to do so may lead to detention until identity is confirmed.",
        source: "https://www.gesetze-im-internet.de/aufenthg_2004/__48.html",
      },
      {
        icon: "shield",
        title: "You don't have to answer questions without a lawyer",
        detail:
          "As per § 136 StPO, you have the right to remain silent and request legal counsel before answering police questions.",
        source: "https://www.gesetze-im-internet.de/stpo/__136.html",
      },
      {
        icon: "search",
        title: "Police need justified suspicion or imminent danger to search you",
        detail:
          "A personal search requires reasonable suspicion of a crime or imminent threat. Police must justify the search.",
        source: "https://www.gesetze-im-internet.de/stpo/__102.html",
      },
      {
        icon: "camera",
        title: "You may film interactions in public places without audio; laws vary by state",
        detail:
          "Video recording is generally allowed in public spaces, but audio recording may violate privacy laws (§ 201 StGB).",
        source: "https://dejure.org/gesetze/StGB/201.html",
      },
    ],
    guidance: [
      {
        icon: "check",
        title: "Stay calm and cooperative",
        detail: "Avoid escalating the situation. Speak respectfully, and avoid sudden movements.",
      },
      {
        icon: "help",
        title: "Ask if you're being detained or are free to go",
        detail: "If not being detained, you can politely walk away. This helps assert your rights clearly.",
      },
      {
        icon: "document",
        title: "Record badge numbers and details",
        detail: "If something feels wrong, note down names, badge numbers, and the time/place of the encounter.",
      },
      {
        icon: "phone",
        title: "Call a lawyer immediately if detained",
        detail: "You have the right to legal counsel. Don’t answer questions without a lawyer present.",
      },
    ],
  },

  "Registering Your Address": {
    steps: [
      {
        icon: "calendar",
        title: "Must register within 14 days of moving",
        detail:
          "Under § 17 BMG, you must register your address within 14 days of moving to a new home.",
        source: "https://www.gesetze-im-internet.de/bmg/__17.html",
      },
      {
        icon: "building",
        title: "Visit your local Bürgeramt",
        detail:
          "You need to make an appointment at the Bürgeramt to register your new address.",
      },
      {
        icon: "clipboard",
        title: "Bring ID, rental contract, and Anmeldung form",
        detail:
          "These documents are necessary for address registration: Passport, rental agreement, and the filled-in form.",
      },
      {
        icon: "pen",
        title: "Landlord must sign the confirmation (Wohnungsgeberbestätigung)",
        detail:
          "As per § 19 BMG, the landlord must confirm your residency at the address by signing the official form.",
        source: "https://www.gesetze-im-internet.de/bmg/__19.html",
      },
    ],
    guidance: [
      {
        icon: "calendar",
        title: "Book your Bürgeramt appointment early",
        detail: "Slots fill up fast. Use the online system to schedule an appointment as soon as you move.",
      },
      {
        icon: "folder",
        title: "Keep scanned copies of all documents",
        detail: "This includes your ID, contract, and signed landlord form. You'll need them for bank, job, visa, etc.",
      },
      {
        icon: "alert",
        title: "Missing the deadline can lead to a fine",
        detail: "You are legally required to register within 14 days of moving. Most cities will not fine you for minor delays, especially if you booked an appointment early. But repeated or long delays without a valid reason can result in a small fine.",
      },
    ],
  },

  "Student Work Rights": {
    steps: [
      {
        icon: "calendar",
        title: "You may work 140 full or 280 half-days per year",
        detail:
          "Students from non-EU countries can work up to 140 full days or 280 half-days annually without special permission. A working day of up to 4 hours counts as a half day.",
        source: "https://www.make-it-in-germany.com/en/study-vocational-training/studies-in-germany/work",
      },
      {
        icon: "timer",
        title: "Alternatively: 20 hours/week during the semester",
        detail:
          "You can work up to 20 hours per week during lecture periods. There's no time limit during semester breaks, but check your health insurance status.",
      },
      {
        icon: "laptop",
        title: "HiWi jobs don’t count towards the 140-day rule",
        detail:
          "If you're working as a student assistant at a university, the 140-day limit doesn't apply — but it's still good to check with your Ausländerbehörde or university.",
      },
      {
        icon: "receipt",
        title: "You can use your job as proof of financial means",
        detail:
          "To renew your visa, you can show that your student job provides €992/month (2025). This allows you to be your own financial guarantor — confirm with your Ausländerbehörde first.",
      },
      {
        icon: "work",
        title: "You may do internships and even switch to vocational training",
        detail:
          "Internships are allowed, and students can switch to vocational training with an amended residence permit under §16b(4) AufenthG.",
        source: "https://www.gesetze-im-internet.de/aufenthg_2004/__16b.html",
      },
      {
        icon: "trending-up",
        title: "You may become a full-time worker — in some cases",
        detail:
          "You can switch to a skilled worker residence permit without completing your degree if a permanent job offer qualifies under §16b(4) AufenthG.",
      },
    ],
    guidance: [
      {
        icon: "calendar",
        title: "Track your working days and hours",
        detail: "Use a calendar or spreadsheet to log each working day and check that you're within legal limits.",
      },
      {
        icon: "folder",
        title: "Keep copies of payslips and contracts",
        detail: "These are essential for visa renewals and protecting yourself in case of exploitation or disputes.",
      },
      {
        icon: "phone",
        title: "Ask your Ausländerbehörde before taking new roles",
        detail: "Whether it’s a side gig, internship, or freelance work, get written approval if unsure — especially for self-employment.",
      },
    ],
  },

  "Health Insurance Guide": {
    steps: [
      {
        icon: "cake",
        title: "You turn 30 and need private coverage",
        detail:
          "After 30, students are no longer eligible for subsidized public health insurance and must switch to private or voluntary insurance plans.",
        source: "https://www.germany-visa.org/insurances-germany/health-insurance/international-students/",
      },
      {
        icon: "document",
        title: "You're unsure how to register for public insurance",
        detail:
          "Contact a statutory insurer (e.g., TK, AOK, Barmer). They’ll help you enroll and issue a confirmation for university or visa purposes.",
      },
      {
        icon: "stethoscope",
        title: "You visit the doctor but aren’t sure what’s covered",
        detail:
          "Most basic services are covered by public insurance, but dental, vision, and private consultations may incur extra costs.",
      },
      {
        icon: "globe",
        title: "You’re using EHIC as an EU student",
        detail:
          "Your EHIC card grants access to necessary public healthcare, but it may not cover all services. Consider supplementary insurance.",
      },
    ],
    guidance: [
      {
        icon: "mail",
        title: "Ask your insurer to confirm coverage in writing",
        detail: "Especially useful for doctor visits, visa extensions, or university enrollment.",
      },
      {
        icon: "euro",
        title: "Compare public and private plans annually",
        detail: "Your situation may change (e.g., part-time job, turning 30), affecting your eligibility and cost.",
      },
      {
        icon: "id-card",
        title: "Always carry your insurance card",
        detail: "You’ll need it when visiting doctors or picking up prescriptions.",
      },
    ],
  },

  "Rental Contract Basics": {
    steps: [
      {
        icon: "door-open",
        title: "Landlord cannot enter without permission",
        detail:
          "Your landlord must provide notice and obtain your consent to enter the property, except in emergencies.",
        source: "https://www.mieterbund.de/mietrecht/abc-z.html?tx_dmblexikon_pi1%5Buid%5D=96",
      },
      {
        icon: "banknote",
        title: "Deposit may not exceed 3 months’ basic rent",
        detail:
          "Landlords can request a deposit of up to 3 net cold rents (excluding utilities), as per § 551 BGB.",
        source: "https://www.gesetze-im-internet.de/bgb/__551.html",
      },
      {
        icon: "wrench",
        title: "Tenants handle minor repairs — within limits",
        detail:
          "You may be responsible for small repairs (e.g. under €100), but only if specified in the rental contract.",
      },
      {
        icon: "calendar",
        title: "Standard notice period is 3 months",
        detail:
          "You can terminate an open-ended rental contract with 3 months' notice. Special rules may apply to fixed-term or early termination.",
        source: "https://www.gesetze-im-internet.de/bgb/__573c.html",
      },
    ],
    guidance: [
      {
        icon: "document",
        title: "Always keep a copy of your rental contract",
        detail: "This includes any signed annexes, rules, or house agreements.",
      },
      {
        icon: "camera",
        title: "Document apartment condition before moving in/out",
        detail: "Take dated photos and complete a handover form to protect your deposit.",
      },
      {
        icon: "mail",
        title: "Submit notice in writing with signature",
        detail: "Written notice must be signed and physically delivered (email is not legally valid).",
      },
    ],
  },

  "Extending Your Residence Permit": {
    steps: [
      {
        icon: "hourglass",
        title: "Start the process at least 8 weeks before expiry",
        detail:
          "Many Ausländerbehörde require advance booking — starting early avoids overstaying and losing legal status.",
      },
      {
        icon: "folder",
        title: "Gather required documents",
        detail:
          "You’ll usually need passport, proof of income/funding, health insurance, rental contract, and biometric photo.",
      },
      {
        icon: "calendar",
        title: "Book an appointment at the Ausländerbehörde",
        detail:
          "You must attend in person. Some offices allow document upload in advance. Check your city’s process.",
      },
      {
        icon: "credit-card",
        title: "Pay the extension fee",
        detail:
          "The standard fee for a residence permit extension is €93. Keep the receipt for your records.",
      },
    ],
    guidance: [
      {
        icon: "alert",
        title: "Don’t wait for your current permit to expire",
        detail: "Starting late can put your status at risk and affect future visa applications.",
      },
      {
        icon: "repeat",
        title: "A 'Fiktionsbescheinigung' extends your stay",
        detail: "If your application is under review, you can receive a temporary certificate allowing legal stay.",
      },
      {
        icon: "phone",
        title: "Ask your foreigner’s office for clarification",
        detail: "Each city may have different processes — call or email with your case number if unsure.",
      },
    ],
  },

  "Changing Universities in Germany": {
    steps: [
      {
        icon: "building",
        title: "Notify your current university",
        detail:
          "You must officially de-register (Exmatrikulation) from your current university before switching.",
      },
      {
        icon: "document",
        title: "Apply to the new university",
        detail:
          "Submit your application according to the new university’s deadlines and program requirements.",
      },
      {
        icon: "book",
        title: "Request credit transfer (if applicable)",
        detail:
          "You can apply to transfer previously earned credits. Each university decides what is recognized.",
      },
      {
        icon: "id-card",
        title: "Update your visa with new admission letter",
        detail:
          "Inform the Ausländerbehörde and submit your new enrollment letter to keep your student residence permit valid.",
      },
    ],
    guidance: [
      {
        icon: "timer",
        title: "Check deadlines carefully",
        detail: "University deadlines vary by state and program. Missing them may delay your studies by a semester.",
      },
      {
        icon: "receipt",
        title: "Gather proof of de-registration and new admission",
        detail: "These are essential for updating health insurance, student housing, and visa records.",
      },
      {
        icon: "mail",
        title: "Talk to both universities’ student offices",
        detail: "Ask about transitional rules, credit policies, and campus access for switching students.",
      },
    ],
  },
};

export default explainerSteps;