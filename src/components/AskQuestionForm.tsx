import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/iconMap";
import { mailto } from "@/lib/mailto";

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

export default function AskQuestionForm() {
  const [category, setCategory] = useState("Other");
  const [question, setQuestion] = useState("");
  const [email, setEmail] = useState("");

  const length = question.trim().length;
  const canSend = length >= 20; // require a little detail

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
    <div className="relative max-w-3xl mx-auto">
      {/* subtle glow */}
      <div className="absolute inset-0 -z-10 rounded-[28px] bg-gradient-to-r from-primary/20 via-primary/10 to-transparent blur-2xl" />
      {/* glass card */}
      <div className="rounded-[28px] border border-border/60 bg-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl dark:bg-slate-900/60">
        <div className="p-6 md:p-8">
          {/* header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <Icon name="help" className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Tell us your question</h3>
              <p className="text-xs text-muted-foreground">
                We’ll point you to the right guide. You can leave email blank.
              </p>
            </div>
          </div>

          <form onSubmit={submit} className="space-y-6">
            {/* Inputs */}
            <div className="grid gap-4 md:grid-cols-12">
              <div className="md:col-span-5">
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
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
                  rows={6}
                  maxLength={1000}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Briefly describe your situation — include your city, dates/deadlines, and who’s involved (landlord, employer, office)…"
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

            {/* Footer */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">
                When you click send, your email app opens. We don’t store this on our
                servers.
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
    </div>
  );
}