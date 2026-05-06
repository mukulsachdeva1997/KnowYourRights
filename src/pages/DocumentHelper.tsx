import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SaveForLaterButton from "@/components/SaveForLaterButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Icon } from "@/lib/iconMap";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  Brain,
  CheckCircle2,
  Copy,
  ExternalLink,
  FileSearch,
  Loader2,
  RotateCcw,
  Sparkles,
} from "lucide-react";

type RiskLevel = "low" | "medium" | "high";

type KeywordRule = {
  term: string;
  meaning: string;
  risk: RiskLevel;
};

type CategoryRule = {
  id: string;
  label: string;
  icon: string;
  keywords: string[];
  guide: { label: string; href: string };
};

const keywordRules: KeywordRule[] = [
  { term: "frist", meaning: "There may be a deadline.", risk: "high" },
  { term: "widerspruch", meaning: "This may involve an objection or appeal.", risk: "high" },
  { term: "bescheid", meaning: "This may be an official decision.", risk: "high" },
  { term: "anhörung", meaning: "An authority may be asking for your statement.", risk: "high" },
  { term: "kündigung", meaning: "This may relate to termination or cancellation.", risk: "high" },
  { term: "mahnung", meaning: "This may be a payment warning.", risk: "medium" },
  { term: "inkasso", meaning: "This may involve debt collection.", risk: "medium" },
  { term: "zahlung", meaning: "Payment or money may be involved.", risk: "medium" },
  { term: "kaution", meaning: "This may relate to a rental deposit.", risk: "medium" },
  { term: "aufenthaltserlaubnis", meaning: "This may relate to your residence permit.", risk: "high" },
  { term: "aufenthaltstitel", meaning: "This may relate to your residence permit.", risk: "high" },
  { term: "ausländerbehörde", meaning: "This may relate to the immigration office.", risk: "high" },
  { term: "fiktionsbescheinigung", meaning: "This may relate to temporary immigration status.", risk: "high" },
  { term: "ungültig", meaning: "A document or status may become invalid.", risk: "high" },
  { term: "exmatrikulation", meaning: "This may relate to university enrollment status.", risk: "high" },
  { term: "krankenversicherung", meaning: "This may relate to health insurance.", risk: "medium" },
];

const categoryRules: CategoryRule[] = [
  {
    id: "official",
    label: "Official Decision / Deadline",
    icon: "alert",
    keywords: ["frist", "widerspruch", "bescheid", "anhörung", "vorladung", "aktenzeichen"],
    guide: { label: "Use Rights Navigator", href: "/navigator" },
  },
  {
    id: "immigration",
    label: "Visa & Immigration",
    icon: "id-card",
    keywords: [
      "aufenthalt",
      "aufenthaltserlaubnis",
      "aufenthaltstitel",
      "ausländerbehörde",
      "fiktionsbescheinigung",
      "visum",
      "verlängerung",
      "ungültig",
      "ablauf",
      "läuft ab",
      "anmeldung",
    ],
    guide: { label: "Residence permit guide", href: "/explainers?topic=extending-your-residence-permit" },
  },
  {
    id: "housing",
    label: "Housing",
    icon: "door-open",
    keywords: ["miete", "vermieter", "kaution", "wohnung", "mietvertrag", "kündigung"],
    guide: { label: "Rental contract guide", href: "/explainers?topic=rental-contract-basics" },
  },
  {
    id: "work",
    label: "Work",
    icon: "work",
    keywords: ["arbeitgeber", "arbeitsvertrag", "lohn", "gehalt", "kündigung", "probezeit", "schicht"],
    guide: { label: "Student work guide", href: "/explainers?topic=student-work-rights" },
  },
  {
    id: "education",
    label: "Education",
    icon: "book",
    keywords: ["universität", "hochschule", "exmatrikulation", "immatrikulation", "prüfung", "studium"],
    guide: { label: "University change guide", href: "/explainers?topic=changing-universities-in-germany" },
  },
  {
    id: "health",
    label: "Health Insurance",
    icon: "stethoscope",
    keywords: ["krankenkasse", "krankenversicherung", "beitrag", "versicherung", "behandlung"],
    guide: { label: "Health insurance guide", href: "/explainers?topic=health-insurance-guide" },
  },
  {
    id: "consumer",
    label: "Consumer Rights",
    icon: "receipt",
    keywords: ["inkasso", "mahnung", "forderung", "zahlungsaufforderung", "rechnung", "verbraucher", "abo"],
    guide: { label: "Debt collection letter guide", href: "/explainers?topic=debt-collection-letter" },
  },
  {
    id: "police",
    label: "Police / Official Notice",
    icon: "shield",
    keywords: ["polizei", "ladung", "vorladung", "straf", "aussage", "bußgeld", "aktenzeichen"],
    guide: { label: "Police stop guide", href: "/explainers?topic=when-the-police-stop-you" },
  },
];

const sampleText =
  "Sehr geehrte Damen und Herren, hiermit erhalten Sie den Bescheid. Gegen diesen Bescheid kann innerhalb eines Monats Widerspruch eingelegt werden. Bitte reichen Sie die fehlende Krankenversicherung und Immatrikulationsbescheinigung ein.";

function normalize(input: string) {
  return input.toLowerCase();
}

function sentencePreview(text: string) {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) return "Paste a German letter, email, contract clause, or official notice to start.";

  const sentence = cleaned.split(/(?<=[.!?])\s+/)[0] || cleaned;
  return sentence.length > 220 ? `${sentence.slice(0, 220)}...` : sentence;
}

function analyzeDocument(text: string) {
  const lower = normalize(text);

  const matchedTerms = keywordRules.filter((rule) => lower.includes(rule.term));

  const immigrationSignals = [
    "aufenthaltserlaubnis",
    "aufenthaltstitel",
    "ausländerbehörde",
    "fiktionsbescheinigung",
    "visum",
  ];
  const officialSignals = ["frist", "widerspruch", "bescheid", "anhörung", "vorladung", "aktenzeichen"];

  const categoryScores = categoryRules
    .map((category) => {
      const score = category.keywords.filter((keyword) => lower.includes(keyword)).length;
      const boostedScore =
        category.id === "immigration" && immigrationSignals.some((keyword) => lower.includes(keyword))
          ? score + 3
          : category.id === "official" && officialSignals.some((keyword) => lower.includes(keyword))
            ? score + 1
            : score;

      return {
        ...category,
        score: boostedScore,
      };
    })
    .sort((a, b) => b.score - a.score);

  const category = categoryScores[0]?.score > 0 ? categoryScores[0] : null;
  const hasDeadline = matchedTerms.some((term) => term.term === "frist" || term.term === "widerspruch");
  const hasOfficialDecision = matchedTerms.some((term) => term.term === "bescheid" || term.term === "anhörung");
  const highRiskCount = matchedTerms.filter((term) => term.risk === "high").length;
  const mediumRiskCount = matchedTerms.filter((term) => term.risk === "medium").length;

  const risk: RiskLevel =
    highRiskCount >= 2 || (hasDeadline && hasOfficialDecision)
      ? "high"
      : highRiskCount >= 1 || mediumRiskCount >= 2
        ? "medium"
        : "low";

  const nextSteps = [
    ...(hasDeadline
      ? ["Find the exact deadline date and save the envelope, email timestamp, or delivery date."]
      : ["Check whether the text mentions a deadline, appointment, payment date, or response period."]),
    "Save the original document and avoid editing the only copy.",
    "Write down what happened before and after receiving it.",
    ...(category?.id === "immigration"
      ? [
          "Prepare passport, current permit, enrollment proof, financing proof, insurance proof, and any appointment emails.",
          "If your permit expires soon, ask the immigration office for written confirmation or a Fiktionsbescheinigung.",
        ]
      : []),
    ...(risk === "high"
      ? ["Contact a qualified advisor, Studierendenwerk, legal clinic, or official support service quickly."]
      : ["Use the matching guide to understand the topic before replying."]),
  ];

  const documents = [
    "Original letter/email and envelope or delivery proof",
    "Passport, residence permit, student ID, or contract if relevant",
    "Screenshots of previous messages and appointment confirmations",
    "A short timeline with dates, names, and amounts",
  ];

  return {
    category,
    risk,
    matchedTerms,
    hasDeadline,
    summary: category
      ? `This looks most related to ${category.label}. ${sentencePreview(text)}`
      : sentencePreview(text),
    nextSteps,
    documents,
  };
}

function riskStyles(risk: RiskLevel) {
  if (risk === "high") return "border-red-200 bg-red-50 text-red-700";
  if (risk === "medium") return "border-amber-200 bg-amber-50 text-amber-700";
  return "border-green-200 bg-green-50 text-green-700";
}

async function runOllamaAnalysis(text: string) {
  const prompt = `You are helping international students in Germany understand German letters, emails, and official documents.
Do not give legal advice. Do not promise an outcome.

Return the answer in TWO language blocks.

First block must be in English:
ENGLISH
1. What this seems to be
2. Urgent words or deadlines
3. What to do next
4. What to collect
5. One caution

Second block must be in simple German:
DEUTSCH
1. Worum es wahrscheinlich geht
2. Wichtige Wörter oder Fristen
3. Was als Nächstes zu tun ist
4. Was gesammelt werden sollte
5. Ein Hinweis

Document:
${text}`;

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3.2:3b",
      prompt,
      stream: false,
      options: {
        temperature: 0.2,
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Local AI request failed");
  }

  const data = (await response.json()) as { response?: string };
  return data.response || "Local AI did not return a response.";
}

const DocumentHelper = () => {
  const [text, setText] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [aiStatus, setAiStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const analysis = useMemo(() => analyzeDocument(text), [text]);
  const hasText = text.trim().length > 0;

  const runLocalAI = async () => {
    if (!hasText) return;

    setAiStatus("loading");
    setAiResult("");

    try {
      const result = await runOllamaAnalysis(text);
      setAiResult(result);
      setAiStatus("done");
    } catch {
      setAiStatus("error");
      setAiResult(
        "Local AI is not available right now. Start Ollama locally and pull a free model such as llama3.2:3b, or use the built-in privacy analysis below."
      );
    }
  };

  const plan = [
    "KnowYourRights AI Document Helper",
    `Detected area: ${analysis.category?.label || "Unclear"}`,
    `Risk level: ${analysis.risk}`,
    "",
    "Plain summary:",
    analysis.summary,
    "",
    "Matched terms:",
    ...(analysis.matchedTerms.length
      ? analysis.matchedTerms.map((term) => `- ${term.term}: ${term.meaning}`)
      : ["- No urgent legal keywords detected."]),
    "",
    "Next steps:",
    ...analysis.nextSteps.map((step) => `- ${step}`),
  ].join("\n");

  const copyPlan = async () => {
    try {
      await navigator.clipboard.writeText(plan);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = plan;
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
                Privacy-first AI
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                AI Document Helper
              </h1>
            </div>
            <SaveForLaterButton className="shrink-0" />
          </div>
          <p className="text-lg text-muted-foreground mt-3 max-w-3xl">
            Paste German text from a letter, contract, email, or official notice. The helper detects
            risky words, likely topic, practical next steps, and can optionally call a free local AI
            model through Ollama.
          </p>
        </div>

        <Alert className="mb-6 rounded-2xl border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-700" />
          <AlertTitle className="text-amber-800">Not legal advice</AlertTitle>
          <AlertDescription className="text-amber-700">
            AI and keyword analysis can be wrong. Use this to prepare, then check official sources or
            ask a qualified professional for your specific situation.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6">
          <Card className="rounded-2xl p-6 shadow-card">
            <div className="mb-4 flex items-center gap-2">
              <FileSearch className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Paste document text</h2>
            </div>

            <Textarea
              value={text}
              onChange={(event) => {
                setText(event.target.value);
                setAiStatus("idle");
                setAiResult("");
              }}
              placeholder="Paste German text here..."
              className="min-h-[280px] rounded-2xl bg-slate-50 text-base leading-relaxed focus:bg-white"
            />

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button className="rounded-full" onClick={runLocalAI} disabled={!hasText || aiStatus === "loading"}>
                {aiStatus === "loading" ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Brain className="mr-2 h-4 w-4" />
                )}
                Run local AI
              </Button>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => setText(sampleText)}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Try sample
              </Button>
              <Button
                variant="ghost"
                className="rounded-full"
                onClick={() => {
                  setText("");
                  setAiResult("");
                  setAiStatus("idle");
                }}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Clear
              </Button>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              Local AI mode is free and optional. It works when Ollama is running on your computer at
              localhost:11434 with a model like llama3.2:3b.
            </p>
          </Card>

          <section className="space-y-6">
            <Card className="rounded-2xl p-6 shadow-card">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Icon name={analysis.category?.icon || "document"} className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Smart analysis</h2>
                </div>
                <Badge className={cn("rounded-full border px-3 py-1", riskStyles(analysis.risk))}>
                  {analysis.risk} risk
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-medium text-foreground">Likely area</p>
                  <p className="mt-1 text-muted-foreground">
                    {analysis.category?.label || "Paste more text to detect the topic."}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-medium text-foreground">Plain summary</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{analysis.summary}</p>
                </div>

                <Button variant="outline" className="w-full rounded-full" onClick={copyPlan} disabled={!hasText}>
                  {copied ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                  {copied ? "Copied" : "Copy analysis"}
                </Button>
              </div>
            </Card>

            {aiStatus !== "idle" && (
              <Card className="rounded-2xl p-6 shadow-card">
                <div className="mb-3 flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Local AI result: English + German</h2>
                </div>
                <div
                  className={cn(
                    "whitespace-pre-wrap rounded-2xl p-4 text-sm leading-relaxed",
                    aiStatus === "error" ? "bg-amber-50 text-amber-800" : "bg-slate-50 text-muted-foreground"
                  )}
                >
                  {aiStatus === "loading" ? "Asking local AI..." : aiResult}
                </div>
              </Card>
            )}
          </section>
        </div>

        <Card className="mt-6 rounded-2xl p-6 shadow-card">
          <div className="mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Use free local AI</h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The built-in keyword analysis works without setup. For fuller AI explanations, install
            Ollama and run a free model on your own computer. The document text is sent only to your
            local Ollama server at localhost:11434.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-foreground">1. Install Ollama</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Download Ollama for macOS, Windows, or Linux and open the app once.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-foreground">2. Pull a model</p>
              <code className="mt-2 block rounded-lg bg-white px-3 py-2 text-sm text-foreground">
                ollama pull llama3.2:3b
              </code>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-foreground">3. Run the helper</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Paste text here, click Run local AI, and review the English + German result.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button variant="outline" className="rounded-full" asChild>
              <a href="https://ollama.com/download" target="_blank" rel="noopener noreferrer">
                Download Ollama
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" className="rounded-full" asChild>
              <a href="https://docs.ollama.com/" target="_blank" rel="noopener noreferrer">
                Ollama docs
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </Card>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="rounded-2xl p-6 shadow-card">
            <div className="mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Detected terms</h3>
            </div>
            <div className="space-y-3">
              {analysis.matchedTerms.length ? (
                analysis.matchedTerms.map((term) => (
                  <div key={term.term} className="rounded-xl border bg-slate-50 p-3">
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <span className="font-medium text-foreground">{term.term}</span>
                      <Badge variant="outline">{term.risk}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{term.meaning}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No urgent keywords detected yet. Paste more text for a stronger signal.
                </p>
              )}
            </div>
          </Card>

          <Card className="rounded-2xl p-6 shadow-card">
            <div className="mb-4 flex items-center gap-2">
              <Icon name="clipboard" className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Next steps</h3>
            </div>
            <div className="space-y-3">
              {analysis.nextSteps.map((step) => (
                <div key={step} className="flex gap-3 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-2xl p-6 shadow-card">
            <div className="mb-4 flex items-center gap-2">
              <Icon name="folder" className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Open next</h3>
            </div>
            <div className="space-y-3">
              {analysis.category ? (
                <Button variant="outline" className="w-full rounded-full" asChild>
                  <Link to={analysis.category.guide.href}>{analysis.category.guide.label}</Link>
                </Button>
              ) : (
                <Button variant="outline" className="w-full rounded-full" asChild>
                  <Link to="/navigator">Use Rights Navigator</Link>
                </Button>
              )}
              <Button variant="outline" className="w-full rounded-full" asChild>
                <Link to="/resources">Find local resources</Link>
              </Button>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DocumentHelper;
