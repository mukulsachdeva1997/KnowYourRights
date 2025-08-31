import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const Explainers = () => {
  const explainers = [
    {
      id: 1,
      title: "When the Police Stop You",
      category: "Police Rights",
      icon: "👮",
      steps: [
        { icon: "🆔", text: "You are required to show ID when asked" },
        { icon: "🤐", text: "You don't have to answer questions without a lawyer" },
        { icon: "🔍", text: "Police need reasonable suspicion to search you" },
        { icon: "📱", text: "You can record the interaction (in most states)" }
      ]
    },
    {
      id: 2,
      title: "Registering Your Address",
      category: "Immigration",
      icon: "📄",
      steps: [
        { icon: "📅", text: "Must register within 14 days of moving" },
        { icon: "🏢", text: "Visit your local Bürgeramt" },
        { icon: "📋", text: "Bring ID, rental contract, and Anmeldung form" },
        { icon: "✍️", text: "Landlord must sign the confirmation" }
      ]
    },
    {
      id: 3,
      title: "Dealing with Workplace Issues",
      category: "Employment",
      icon: "💼",
      steps: [
        { icon: "📝", text: "Document everything in writing" },
        { icon: "👥", text: "Speak with your works council (Betriebsrat)" },
        { icon: "⚖️", text: "Know your termination notice periods" },
        { icon: "🏛️", text: "Contact labor court for serious violations" }
      ]
    },
    {
      id: 4,
      title: "Housing Deposit Disputes",
      category: "Housing",
      icon: "🏠",
      steps: [
        { icon: "📊", text: "Deposit cannot exceed 3 months' rent" },
        { icon: "📸", text: "Document apartment condition on move-in" },
        { icon: "⏰", text: "Landlord has 6 months to return deposit" },
        { icon: "📮", text: "Send formal written demand if withheld" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Step-by-Step Explainers
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, visual guides to navigate complex legal situations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {explainers.map((explainer) => (
            <Card key={explainer.id} className="p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="text-3xl">{explainer.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {explainer.title}
                  </h3>
                  <Badge variant="secondary">{explainer.category}</Badge>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {explainer.steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="text-xl flex-shrink-0">{step.icon}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {step.text}
                      </p>
                    </div>
                    {index < explainer.steps.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full rounded-full group">
                Read Full Guide
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 py-12 bg-slate-50 rounded-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Need a Custom Guide?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Can't find what you're looking for? Suggest a new explainer topic and we'll create it.
          </p>
          <Button className="rounded-full px-8">
            Suggest a Topic
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Explainers;