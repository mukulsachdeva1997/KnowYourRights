import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/iconMap";
import { mailto } from "@/lib/mailto";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  role: "user" | "assistant";
  content: string;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const CATEGORIES = [
  "Housing",
  "Work",
  "Police",
  "Visa & Immigration",
  "Health",
  "Education",
  "Consumer Rights",
  "Other",
];

// Optional serverless chat endpoint. Static GitHub Pages builds should leave this unset.
const API_URL = import.meta.env.VITE_CHAT_API_URL ?? "";

// ─── AI Chat Component ────────────────────────────────────────────────────────

function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      if (!API_URL) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "This hosted version does not have a live chat backend configured.\n\nUse the Rights Navigator for guided steps, or paste German letters into the AI Document Helper for local analysis.\n\nHelpful routes:\n- /navigator\n- /document-helper\n- /faq\n\nNot legal advice. For urgent or serious matters, contact a qualified professional or local support service.",
          },
        ]);
        return;
      }

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setError(
        "Something went wrong reaching the AI. Please try again or use the email form below."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="rounded-[28px] border border-border/60 bg-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl dark:bg-slate-900/60 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-border/40">
        <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
          <Icon name="sparkles" className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-base font-semibold">
            {API_URL ? "Ask AI about your rights" : "Find the right tool for your question"}
          </h3>
          <p className="text-xs text-muted-foreground">
            Optional chat backend · Use Navigator and Document Helper without setup
          </p>
        </div>
        <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-medium">
          {API_URL ? "Live" : "Static"}
        </span>
      </div>

      {/* Messages */}
      <div className="min-h-[280px] max-h-[420px] overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col gap-2 pt-2">
            <p className="text-sm text-muted-foreground">
              Describe your situation. If no chat backend is configured, we will route you to the best built-in tool. For example:
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              {[
                "My landlord won't return my deposit",
                "Can I work more than 20 hours a week?",
                "What happens if I miss the Anmeldung deadline?",
                "My employer fired me without notice",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="text-xs px-3 py-1.5 rounded-full border border-border/60 hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {/* Avatar */}
            <div
              className={`h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium mt-0.5 ${
                msg.role === "user"
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {msg.role === "user" ? (
                <Icon name="user" className="h-3.5 w-3.5" />
              ) : (
                <Icon name="sparkles" className="h-3.5 w-3.5" />
              )}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-sm"
                  : "bg-muted/60 text-foreground rounded-tl-sm"
              }`}
            >
              {msg.role === "assistant" ? (
                <FormattedMessage content={msg.content} />
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <Icon name="sparkles" className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div className="bg-muted/60 rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1 items-center h-5">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        {error && (
          <p className="text-xs text-destructive bg-destructive/10 rounded-xl px-4 py-2">
            {error}
          </p>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-border/40">
        <div className="flex gap-2 items-end">
          <textarea
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Describe your situation… (Enter to send, Shift+Enter for new line)"
            className="flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          />
          <Button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="rounded-xl px-4 py-2 h-auto self-end"
          >
            <Icon name="send" className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Not legal advice · Use source-backed guides · For serious matters, consult a professional
        </p>
      </div>
    </div>
  );
}

// ─── Formats AI markdown-like responses into readable JSX ────────────────────

function FormattedMessage({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />;

        // Numbered list
        if (/^\d+\.\s/.test(line)) {
          return (
            <p key={i} className="pl-2">
              {renderInline(line)}
            </p>
          );
        }

        // Bullet
        if (/^[-•]\s/.test(line)) {
          return (
            <p key={i} className="pl-2">
              {renderInline(line)}
            </p>
          );
        }

        // Bold heading
        if (line.startsWith("**") && line.endsWith("**")) {
          return (
            <p key={i} className="font-medium">
              {line.replace(/\*\*/g, "")}
            </p>
          );
        }

        // Warning line
        if (line.startsWith("⚠️")) {
          return (
            <p key={i} className="text-xs text-muted-foreground italic mt-2 pt-2 border-t border-border/40">
              {line}
            </p>
          );
        }

        return <p key={i}>{renderInline(line)}</p>;
      })}
    </div>
  );
}

// Renders inline bold (**text**) and links (https://...)
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s]+)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.replace(/\*\*/g, "")}</strong>;
    }
    if (part.startsWith("http")) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-primary break-all"
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

// ─── Original Email Form (fallback) ──────────────────────────────────────────

function EmailForm() {
  const [category, setCategory] = useState("Other");
  const [question, setQuestion] = useState("");
  const [email, setEmail] = useState("");

  const length = question.trim().length;
  const canSend = length >= 20;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend) return;
    mailto({
      subject: "New question from FAQ page",
      body:
        `Category: ${category}\r\n` +
        `Email: ${email || "n/a"}\r\n\r\n` +
        `Question:\r\n${question}\r\n`,
    });
  }

  return (
    <div className="rounded-[28px] border border-border/60 bg-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl dark:bg-slate-900/60">
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <Icon name="help" className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-semibold">Send us your question</h3>
            <p className="text-xs text-muted-foreground">
              Prefer email? We'll point you to the right guide. You can leave email blank.
            </p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-12">
            <div className="md:col-span-5">
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-7">
              <label className="block text-sm font-medium mb-1">
                Your email (optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="We'll reply here if needed"
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              />
            </div>

            <div className="md:col-span-12">
              <label className="block text-sm font-medium mb-1">
                Your question *
              </label>
              <textarea
                required
                rows={5}
                maxLength={1000}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Briefly describe your situation — include your city, dates/deadlines, and who's involved…"
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              />
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>Tip: more detail helps us route you to the best explainer.</span>
                <span className={length > 980 ? "text-destructive" : ""}>
                  {length}/1000
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              When you click send, your email app opens. We don't store this on our servers.
            </p>
            <Button
              type="submit"
              className="rounded-full px-6"
              disabled={!canSend}
              title={!canSend ? "Please provide at least 20 characters" : undefined}
            >
              <Icon name="send" className="h-4 w-4 mr-2" />
              Send question
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function AskQuestionForm() {
  return (
    <div className="relative max-w-3xl mx-auto space-y-6">
      {/* Subtle background glow */}
      <div className="absolute inset-0 -z-10 rounded-[28px] bg-gradient-to-r from-primary/20 via-primary/10 to-transparent blur-2xl" />

      {/* 1. AI Chat */}
      <AIChat />

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border/40" />
        <span className="text-xs text-muted-foreground px-2">
          or prefer email?
        </span>
        <div className="flex-1 h-px bg-border/40" />
      </div>

      {/* 2. Original email form as fallback */}
      <EmailForm />
    </div>
  );
}
