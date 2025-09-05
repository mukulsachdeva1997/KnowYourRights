import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import ExplainerSlidePanel from "@/components/ExplainerSlidePanel";
import explainerSteps from "@/data/explainerSteps";
import { Icon } from "@/lib/iconMap";
import Footer from "@/components/Footer";
import { mailto } from "@/lib/mailto";
import SaveForLaterButton from "@/components/SaveForLaterButton";

// Step interface
interface Step {
  title: string;
  detail: string;
  icon?: string;
  source?: string;
}

// Explainer interface
interface Explainer {
  id: number;
  title: string;
  slug: string;          // <= added for URL matching
  icon?: string;         // lucide key (from iconMap)
  category: string;
  steps: Step[];
  guidance?: Step[];
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getCategoryFromTitle(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("police")) return "Police";
  if (t.includes("insurance") || t.includes("health")) return "Health";
  if (t.includes("university") || t.includes("universities")) return "Education";
  if (t.includes("work") || t.includes("employment")) return "Work";
  if (t.includes("housing") || t.includes("deposit") || t.includes("rental")) return "Housing";
  if (t.includes("register") || t.includes("permit") || t.includes("residence")) return "Immigration";
  return "General";
}

const Explainers = () => {
  const [searchParams] = useSearchParams();
  const topicParam = (searchParams.get("topic") || "").toLowerCase();

  const explainers: Explainer[] = useMemo(
    () =>
      Object.entries(explainerSteps).map(([title, explainerData], index) => ({
        id: index + 1,
        title,
        slug: slugify(title),
        icon: explainerData.steps[0]?.icon || "info", // fallback
        category: getCategoryFromTitle(title),
        steps: explainerData.steps as unknown as Step[],
        guidance: explainerData.guidance as unknown as Step[],
      })),
    []
  );

  // If a topic slug is present, pick that explainer only
  const selectedBySlug = useMemo(
    () =>
      topicParam
        ? explainers.find((e) => e.slug === topicParam) || null
        : null,
    [explainers, topicParam]
  );

  const explainersToShow = selectedBySlug ? [selectedBySlug] : explainers;

  const [openPanel, setOpenPanel] = useState(false);
  const [selectedExplainer, setSelectedExplainer] = useState<Explainer | null>(null);

  // Auto-open the panel when we land with a matching ?topic=
  useEffect(() => {
    if (selectedBySlug) {
      setSelectedExplainer(selectedBySlug);
      setOpenPanel(true);
    }
  }, [selectedBySlug]);

  const handleOpenPanel = (explainer: Explainer) => {
    setSelectedExplainer(explainer);
    setOpenPanel(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header with Save icon beside the title */}
        <div className="mb-12">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Step-by-Step Explainers
            </h1>
            <SaveForLaterButton className="shrink-0" />
          </div>
          <p className="text-lg text-muted-foreground mt-1">
            Simple, visual guides to navigate complex legal situations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {explainersToShow.map((explainer) => (
            <Card
              key={explainer.id}
              className="p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Icon name={explainer.icon} className="h-7 w-7 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {explainer.title}
                  </h3>
                  <Badge variant="secondary">{explainer.category}</Badge>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {explainer.steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <Icon name={step.icon} className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground flex items-center gap-2 flex-wrap">
                        {step.title}
                        {step.source && (
                          <a
                            href={step.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full hover:underline transition-colors"
                          >
                            Source
                          </a>
                        )}
                      </p>
                    </div>
                    {index < explainer.steps.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full rounded-full group"
                onClick={() => handleOpenPanel(explainer)}
              >
                Legal & Practical Steps
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16 py-12 bg-slate-50 rounded-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Need a Custom Guide?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Can’t find what you're looking for? Suggest a new explainer topic and we'll create it.
          </p>
          <Button
            className="rounded-full px-8"
            onClick={() =>
              mailto({
                subject: "Topic suggestion",
                body:
                  "Category (e.g., Housing, Work):\n" +
                  "Describe your situation briefly:\n\n" +
                  "Optional contact (phone/Telegram):\n",
              })
            }
          >
            Suggest a Topic
          </Button>
        </div>

        <p className="text-sm text-center text-muted-foreground mt-10 max-w-2xl mx-auto">
          ⚖️ This content is for informational purposes only and does not constitute legal advice.
          Always consult a legal professional for your specific situation.
        </p>
      </div>

      <ExplainerSlidePanel
        open={openPanel}
        onClose={() => setOpenPanel(false)}
        explainer={selectedExplainer}
      />
      <Footer />
    </div>
  );
};

export default Explainers;