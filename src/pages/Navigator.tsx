import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SaveForLaterButton from "@/components/SaveForLaterButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/lib/iconMap";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clipboard, Copy, ExternalLink, RotateCcw } from "lucide-react";

type Question = {
  id: string;
  text: string;
  weight: number;
};

type Scenario = {
  id: string;
  title: string;
  category: string;
  icon: string;
  summary: string;
  questions: Question[];
  collect: string[];
  firstSteps: string[];
  phrases: { de: string; en: string }[];
  links: { label: string; href: string }[];
};

const scenarios: Scenario[] = [
  {
    id: "deposit",
    title: "Landlord keeps my deposit",
    category: "Housing",
    icon: "door-open",
    summary: "Work out what to collect, how to ask in writing, and when to get tenant help.",
    questions: [
      { id: "movedOut", text: "I already moved out and returned the keys.", weight: 1 },
      { id: "handover", text: "I have a handover protocol, photos, or messages about the apartment condition.", weight: -1 },
      { id: "months", text: "It has been more than 3 months since move-out.", weight: 2 },
      { id: "deduction", text: "The landlord made deductions but did not explain them in writing.", weight: 2 },
      { id: "pressure", text: "I am being pressured to accept unclear charges.", weight: 2 },
    ],
    collect: [
      "Rental contract and deposit payment proof",
      "Move-in and move-out photos or videos",
      "Handover protocol, key return proof, and landlord messages",
      "Any invoices or written deductions from the landlord",
    ],
    firstSteps: [
      "Write a short formal email asking for a written calculation of the deposit and deductions.",
      "Give a clear response deadline and keep all communication in writing.",
      "Avoid agreeing to unclear deductions before you understand the reason and amount.",
      "If the answer stays vague, contact your local Mieterverein or student legal advice office.",
    ],
    phrases: [
      {
        de: "Bitte senden Sie mir eine schriftliche Abrechnung der Kaution und aller Abzüge.",
        en: "Please send me a written calculation of the deposit and all deductions.",
      },
      {
        de: "Ich bitte um Rückzahlung der Kaution auf mein bekanntes Konto.",
        en: "I request repayment of the deposit to my known bank account.",
      },
    ],
    links: [
      { label: "Rental Contract Basics", href: "/explainers?topic=rental-contract-basics" },
      { label: "Tenant help resources", href: "/resources" },
    ],
  },
  {
    id: "unpaid-work",
    title: "Employer is not paying me",
    category: "Work",
    icon: "work",
    summary: "Prepare proof, ask for payment clearly, and know when the issue becomes urgent.",
    questions: [
      { id: "contract", text: "I have a contract, offer email, shift plan, or chat confirming the work.", weight: -1 },
      { id: "late", text: "Payment is more than 7 days late.", weight: 2 },
      { id: "trial", text: "The employer called it unpaid trial work.", weight: 2 },
      { id: "cash", text: "They want to pay cash only or avoid written records.", weight: 2 },
      { id: "threat", text: "They threatened my job, visa, or future references.", weight: 3 },
    ],
    collect: [
      "Employment contract, offer letter, emails, and messages",
      "Shift plans, timesheets, screenshots, and calendar entries",
      "Bank statements showing missing payment",
      "Names of supervisors and witnesses",
    ],
    firstSteps: [
      "Create a simple timeline of the days and hours you worked.",
      "Send a written payment request with the exact amount, period, and bank details.",
      "Do not rely only on phone calls; keep proof of your request.",
      "Contact student advice, a union advice office, or legal support if payment is still withheld.",
    ],
    phrases: [
      {
        de: "Bitte zahlen Sie den ausstehenden Lohn für den Zeitraum bis spätestens zum genannten Datum.",
        en: "Please pay the outstanding wages for the stated period by the named date.",
      },
      {
        de: "Bitte bestätigen Sie mir schriftlich, wann die Zahlung erfolgt.",
        en: "Please confirm in writing when the payment will be made.",
      },
    ],
    links: [
      { label: "Student Work Rights", href: "/explainers?topic=student-work-rights" },
      { label: "Work resources", href: "/resources" },
    ],
  },
  {
    id: "visa-expiry",
    title: "My residence permit is expiring",
    category: "Visa & Immigration",
    icon: "id-card",
    summary: "Reduce panic, collect the right documents, and request proof before expiry.",
    questions: [
      { id: "under30", text: "My permit expires in less than 30 days.", weight: 3 },
      { id: "submitted", text: "I already applied or emailed the immigration office before expiry.", weight: -2 },
      { id: "appointment", text: "I cannot find an appointment.", weight: 2 },
      { id: "travel", text: "I plan to travel outside Germany soon.", weight: 2 },
      { id: "study", text: "My enrollment, financing, or insurance proof is missing.", weight: 2 },
    ],
    collect: [
      "Passport and current residence permit",
      "Enrollment certificate, proof of financing, and health insurance proof",
      "Appointment confirmations, emails, forms, and upload receipts",
      "A screenshot or PDF showing you tried to book an appointment",
    ],
    firstSteps: [
      "Apply or contact the immigration office before the current permit expires.",
      "Ask for written confirmation or a Fiktionsbescheinigung if your application is pending.",
      "Keep proof of every submission and message.",
      "Avoid international travel until you understand your re-entry status.",
    ],
    phrases: [
      {
        de: "Ich beantrage die Verlängerung meines Aufenthaltstitels und bitte um eine schriftliche Bestätigung.",
        en: "I apply to extend my residence permit and request written confirmation.",
      },
      {
        de: "Bitte teilen Sie mir mit, ob ich eine Fiktionsbescheinigung erhalten kann.",
        en: "Please tell me whether I can receive a temporary certificate.",
      },
    ],
    links: [
      { label: "Extending Your Residence Permit", href: "/explainers?topic=extending-your-residence-permit" },
      { label: "Immigration offices", href: "/resources" },
    ],
  },
  {
    id: "police-stop",
    title: "Police stopped or questioned me",
    category: "Police",
    icon: "shield",
    summary: "Stay calm, understand what to say, and record the key facts afterwards.",
    questions: [
      { id: "detained", text: "I was taken to a station or told I could not leave.", weight: 3 },
      { id: "search", text: "My bag, phone, room, or body was searched.", weight: 2 },
      { id: "paper", text: "I received a paper, fine, summons, or case number.", weight: 2 },
      { id: "injury", text: "I was hurt, threatened, or felt unsafe.", weight: 3 },
      { id: "statement", text: "I was asked to sign or explain something I did not fully understand.", weight: 3 },
    ],
    collect: [
      "Date, time, location, and officer names or badge numbers if available",
      "Photos of documents, fines, summons, or case numbers",
      "Witness names and contact details",
      "Medical notes or photos if you were injured",
    ],
    firstSteps: [
      "Write down what happened while it is still fresh.",
      "Do not sign statements you do not understand; ask for interpretation or legal help.",
      "If you received a deadline, treat it as urgent and get advice quickly.",
      "For immediate danger, call 110; for medical emergencies, call 112.",
    ],
    phrases: [
      {
        de: "Ich möchte keine Aussage machen, bevor ich rechtlichen Rat bekommen habe.",
        en: "I do not want to make a statement before getting legal advice.",
      },
      {
        de: "Bitte geben Sie mir das schriftlich.",
        en: "Please give that to me in writing.",
      },
    ],
    links: [
      { label: "When Police Stop You", href: "/explainers?topic=when-the-police-stop-you" },
      { label: "Emergency resources", href: "/resources?section=emergency" },
    ],
  },
  {
    id: "debt-collection",
    title: "I received a debt collection letter",
    category: "Consumer Rights",
    icon: "receipt",
    summary: "Check Inkasso demands, suspicious fees, and payment pressure before replying.",
    questions: [
      { id: "unknownDebt", text: "I do not recognize the original contract, invoice, or company.", weight: 3 },
      { id: "shortDeadline", text: "The letter gives a very short deadline or threatens court action.", weight: 2 },
      { id: "extraFees", text: "The extra Inkasso fees look high or are not explained clearly.", weight: 2 },
      { id: "foreignIban", text: "The payment details, IBAN, or company information look suspicious.", weight: 3 },
      { id: "proof", text: "I have the original invoice, cancellation proof, or payment record.", weight: -1 },
    ],
    collect: [
      "The Inkasso letter, envelope, email timestamp, and reference number",
      "Original invoice, contract, order confirmation, or cancellation proof",
      "Bank records showing payment or failed direct debit if relevant",
      "Screenshots of suspicious company details, IBAN, emails, or messages",
    ],
    firstSteps: [
      "Do not pay immediately if you do not understand or recognize the claim.",
      "Check who the original creditor is and what contract or invoice the demand refers to.",
      "Use the free Verbraucherzentrale Inkasso-Check to review the claim and fees.",
      "Ask for a written breakdown if the creditor, amount, or extra fees are unclear.",
    ],
    phrases: [
      {
        de: "Bitte senden Sie mir eine nachvollziehbare Aufstellung der Hauptforderung, Gebühren und des ursprünglichen Vertrags.",
        en: "Please send me a clear breakdown of the main claim, fees, and original contract.",
      },
      {
        de: "Ich erkenne die Forderung derzeit nicht an und bitte um schriftliche Nachweise.",
        en: "I do not currently acknowledge the claim and request written proof.",
      },
    ],
    links: [
      { label: "Debt Collection Letter", href: "/explainers?topic=debt-collection-letter" },
      { label: "Consumer resources", href: "/resources" },
    ],
  },
];

function getUrgency(score: number) {
  if (score >= 7) {
    return {
      label: "High urgency",
      tone: "bg-red-50 text-red-700 border-red-200",
      advice: "Act today. Save evidence, avoid signing unclear documents, and contact a qualified advisor or official support service.",
    };
  }

  if (score >= 4) {
    return {
      label: "Medium urgency",
      tone: "bg-amber-50 text-amber-700 border-amber-200",
      advice: "This needs written follow-up soon. Prepare proof and set a clear deadline in your message.",
    };
  }

  return {
    label: "Lower urgency",
    tone: "bg-green-50 text-green-700 border-green-200",
    advice: "You have time to organize the facts. Keep records and use the linked guide before escalating.",
  };
}

const Navigator = () => {
  const [selectedId, setSelectedId] = useState(scenarios[0].id);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  const selected = scenarios.find((scenario) => scenario.id === selectedId) || scenarios[0];

  const score = useMemo(
    () =>
      selected.questions.reduce(
        (total, question) => total + (answers[question.id] ? question.weight : 0),
        0
      ),
    [answers, selected]
  );

  const urgency = getUrgency(score);

  const selectedSignals = selected.questions
    .filter((question) => answers[question.id])
    .map((question) => question.text);

  const summary = [
    `KnowYourRights situation: ${selected.title}`,
    `Category: ${selected.category}`,
    `Urgency: ${urgency.label}`,
    "",
    "Signals selected:",
    ...(selectedSignals.length ? selectedSignals.map((signal) => `- ${signal}`) : ["- None selected yet"]),
    "",
    "First steps:",
    ...selected.firstSteps.map((step) => `- ${step}`),
    "",
    "Documents to collect:",
    ...selected.collect.map((item) => `- ${item}`),
  ].join("\n");

  const handleScenarioChange = (id: string) => {
    setSelectedId(id);
    setAnswers({});
    setCopied(false);
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = summary;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-10">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            <div>
              <Badge className="mb-3 rounded-full" variant="secondary">
                Smart triage
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Rights Navigator
              </h1>
            </div>
            <SaveForLaterButton className="shrink-0" />
          </div>
          <p className="text-lg text-muted-foreground mt-3 max-w-3xl">
            Pick a real-life problem, answer a few quick signals, and get a practical action plan
            with documents, phrases, and the right guides to open next.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.4fr] gap-6">
          <section className="space-y-4" aria-label="Choose your situation">
            {scenarios.map((scenario) => {
              const active = scenario.id === selected.id;

              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => handleScenarioChange(scenario.id)}
                  className={cn(
                    "w-full rounded-2xl border bg-card p-5 text-left shadow-card transition-all hover:shadow-card-hover",
                    active && "border-primary ring-2 ring-primary/20"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-primary/10 p-3 text-primary">
                      <Icon name={scenario.icon} className="h-5 w-5" label={scenario.title} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-semibold text-foreground">{scenario.title}</h2>
                        <Badge variant="outline">{scenario.category}</Badge>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {scenario.summary}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </section>

          <section className="space-y-6">
            <Card className="rounded-2xl p-6 shadow-card">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Icon name={selected.icon} className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">{selected.title}</h2>
                  </div>
                  <p className="text-muted-foreground">
                    Select anything that matches your situation. Your answers stay in this browser.
                  </p>
                </div>
                <Badge className={cn("w-fit rounded-full border px-3 py-1", urgency.tone)}>
                  {urgency.label}
                </Badge>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {selected.questions.map((question) => {
                  const active = Boolean(answers[question.id]);

                  return (
                    <button
                      key={question.id}
                      type="button"
                      onClick={() =>
                        setAnswers((current) => ({
                          ...current,
                          [question.id]: !current[question.id],
                        }))
                      }
                      className={cn(
                        "flex items-start gap-3 rounded-xl border p-4 text-left transition-colors",
                        active ? "border-primary bg-primary/5" : "bg-white hover:bg-slate-50"
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                          active && "border-primary bg-primary text-primary-foreground"
                        )}
                        aria-hidden="true"
                      >
                        {active && <CheckCircle2 className="h-4 w-4" />}
                      </span>
                      <span className="text-sm font-medium text-foreground">{question.text}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                <h3 className="font-semibold text-foreground">What this means</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {urgency.advice} This tool is informational and helps you prepare for professional
                  support; it does not replace legal advice.
                </p>
              </div>
            </Card>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card className="rounded-2xl p-6 shadow-card">
                <div className="mb-4 flex items-center gap-2">
                  <Icon name="clipboard" className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">First steps</h3>
                </div>
                <div className="space-y-3">
                  {selected.firstSteps.map((step, index) => (
                    <div key={step} className="flex gap-3 text-sm text-foreground">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                        {index + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="rounded-2xl p-6 shadow-card">
                <div className="mb-4 flex items-center gap-2">
                  <Clipboard className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Collect these</h3>
                </div>
                <div className="space-y-3">
                  {selected.collect.map((item) => (
                    <div key={item} className="flex gap-3 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card className="rounded-2xl p-6 shadow-card">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Useful German phrases</h3>
                  <p className="text-sm text-muted-foreground">
                    Copy these into an email or use them when asking for written confirmation.
                  </p>
                </div>
                <Button variant="outline" className="rounded-full" onClick={copySummary}>
                  {copied ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                  {copied ? "Copied" : "Copy plan"}
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {selected.phrases.map((phrase) => (
                  <div key={phrase.de} className="rounded-xl border bg-slate-50 p-4">
                    <p className="font-medium text-foreground">{phrase.de}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{phrase.en}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="rounded-2xl p-6 shadow-card">
              <div className="mb-4 flex items-center gap-2">
                <Icon name="folder" className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Open the right guide next</h3>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {selected.links.map((link) => (
                  <Button key={link.href} variant="outline" className="rounded-full" asChild>
                    <Link to={link.href}>
                      {link.label}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  className="rounded-full"
                  onClick={() => {
                    setAnswers({});
                    setCopied(false);
                  }}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset answers
                </Button>
              </div>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Navigator;
