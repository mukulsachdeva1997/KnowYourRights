import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import type { GuidanceStep } from "@/data/explainerSteps"; // <- unused
import { Icon } from "@/lib/iconMap"; // <-- NEW

interface Step {
  title: string;
  detail: string;
  icon?: string;   // string key that exists in iconMap (e.g., "id-card")
  source?: string;
}

interface Explainer {
  title: string;
  category: string;
  steps: Step[];
  guidance?: Step[];
}

interface Props {
  open: boolean;
  onClose: () => void;
  explainer: Explainer | null;
}

const ExplainerSlidePanel = ({ open, onClose, explainer }: Props) => {
  const [activeTab, setActiveTab] = useState("rights");

  if (!explainer) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-2xl flex flex-col h-[90vh]">
        {/* Fixed header */}
        <DialogHeader className="mb-2 shrink-0">
          <DialogTitle className="text-2xl">{explainer.title}</DialogTitle>
          <DialogDescription>
            <Badge variant="secondary">{explainer.category}</Badge>
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-1">
          <Tabs defaultValue="rights" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4 w-full grid grid-cols-2">
              <TabsTrigger value="rights">Legal Steps</TabsTrigger>
              <TabsTrigger value="guidance">Practical Steps</TabsTrigger>
            </TabsList>

            {/* Tab 1: Legal Rights */}
            <TabsContent value="rights" className="space-y-4">
              {explainer.steps.map((step, index) => (
                <div key={index} className="bg-muted p-4 rounded-xl">
                  <div className="flex items-start gap-3">
                    {step.icon && (
                      <Icon
                        name={step.icon}
                        className="h-5 w-5 mt-0.5 shrink-0"
                        label={step.title}
                        />
                    )}
                    <div>
                      <p className="font-semibold">{step.title}</p>
                      <p className="text-muted-foreground text-sm mt-1">{step.detail}</p>
                      {step.source && (
                        <a
                          href={step.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 text-sm mt-2 inline-block"
                        >
                          View Law ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            {/* Tab 2: What To Do */}
            <TabsContent value="guidance" className="space-y-4">
              {explainer.guidance?.map((item, index) => (
                <div key={index} className="bg-muted p-4 rounded-xl">
                  <div className="flex items-start gap-3">
                    {item.icon && (
                      <Icon
                        name={item.icon}
                        className="h-5 w-5 mt-0.5 shrink-0"
                        label={item.title}
                        />
                    )}
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-muted-foreground text-sm mt-1">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
              {!explainer.guidance?.length && (
                <p className="text-muted-foreground">No practical steps available.</p>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer button */}
        <div className="mt-4 shrink-0 flex justify-end">
          <button
            onClick={onClose}
            className="text-sm px-4 py-2 rounded-full border border-input hover:bg-muted"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExplainerSlidePanel;