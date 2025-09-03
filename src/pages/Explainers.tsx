import { useState } from "react";
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
  icon?: string;        // lucide key (from iconMap)
  category: string;
  steps: Step[];
  guidance?: Step[];
}

// Map your Topics `explainerTag` -> explainer title
const TAG_TO_TITLE: Record<string, string> = {
  "stop-and-search": "When the Police Stop You",
  "rental-rights": "Rental Contract Basics",
  "student-work": "Student Work Rights",
  "health-coverage": "Health Insurance Guide",
  "register-address": "Registering Your Address",
  "residence-permit": "Extending Your Residence Permit",
  "changing-university": "Changing Universities in Germany",
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const Explainers = () => {
  const explainers: Explainer[] = Object.entries(explainerSteps).map(
    ([title, explainerData], index) => ({
      id: index + 1,
      title,
      icon: explainerData.steps[0]?.icon || "info", // fallback to info
      category: getCategoryFromTitle(title),
      // data already has {title, detail, icon, source}
      steps: explainerData.steps,
      guidance: explainerData.guidance,
    })
  );

  // --- URL filtering: show only the requested explainer ---
  const [params] = useSearchParams();
  const topicParam = (params.get("topic") || "").toLowerCase();     // e.g. "stop-and-search" or "when-the-police-stop-you"
  const categoryParam = (params.get("category") || "").toLowerCase();

  // Resolve the title we should show (works with tag OR slugified title)
  const targetTitle =
    TAG_TO_TITLE[topicParam] ||
    (topicParam
      ? (explainers.find((e) => slugify(e.title) === topicParam)?.title || "")
      : "");

  // Apply filters
  let visibleExplainers = explainers;
  if (categoryParam) {
    visibleExplainers = visibleExplainers.filter(
      (e) => e.category.toLowerCase() === categoryParam
    );
  }
  if (targetTitle) {
    visibleExplainers = visibleExplainers.filter((e) => e.title === targetTitle);
  }
  // --------------------------------------------------------

  const [openPanel, setOpenPanel] = useState(false);
  const [selectedExplainer, setSelectedExplainer] = useState<Explainer | null>(null);

  const handleOpenPanel = (explainer: Explainer) => {
    setSelectedExplainer(explainer);
    setOpenPanel(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 flex items-center justify-between gap-4">
          <div className="text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Step-by-Step Explainers
            </h1>
            <p className="text-lg text-muted-foreground mt-1">
              Simple, visual guides to navigate complex legal situations
            </p>
          </div>
          <div className="hidden sm:block">
            <SaveForLaterButton />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {visibleExplainers.map((explainer) => (
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

function getCategoryFromTitle(title: string): string {
  if (title.toLowerCase().includes("police")) return "Police";
  if (title.toLowerCase().includes("insurance") || title.toLowerCase().includes("health")) return "Health";
  if (title.toLowerCase().includes("university") || title.toLowerCase().includes("universities")) return "Education";
  if (title.toLowerCase().includes("work") || title.toLowerCase().includes("employment")) return "Work";
  if (title.toLowerCase().includes("housing") || title.toLowerCase().includes("deposit") || title.toLowerCase().includes("rental")) return "Housing";
  if (title.toLowerCase().includes("register") || title.toLowerCase().includes("permit")) return "Immigration";
  return "General";
}

export default Explainers;