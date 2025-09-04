import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Icon } from "@/lib/iconMap";
import Footer from "@/components/Footer";
import { mailto } from "@/lib/mailto";
import SaveForLaterButton from "@/components/SaveForLaterButton";

type Resource = {
  id: number;
  name: string;
  category: string;
  type: string;
  icon: string;           // lucide key from iconMap (e.g., "phone", "file-text")
  description: string;
  contact: string;
  website: string;        // official site or locator URL
  location: string;
};

const Resources = () => {
  const resources: Resource[] = [
    {
      id: 1,
      name: "Mieterbund (Tenant Union)",
      category: "Housing",
      type: "Legal Help",
      icon: "phone",
      description: "Get legal help for tenant disputes and rental issues",
      contact: "Find your local Mieterverein",
      website: "https://mieterbund.de/mieterverein-vor-ort/",
      location: "Available nationwide",
    },
    {
      id: 2,
      name: "Studierendenwerk",
      category: "Student Support",
      type: "Advisory",
      icon: "info",
      description: "Support services for university students including legal advice",
      contact: "Varies by location",
      website:
        "https://www.studierendenwerke.de/en/deutsches-studentenwerk/studentenwerke/studierendenwerke-a-z",
      location: "At every university",
    },
    {
      id: 3,
      name: "Ausländerbehörde",
      category: "Immigration",
      type: "Government",
      icon: "building",
      description: "Immigration office for visa, residence permit applications",
      contact: "Your local office",
      website: "https://bamf-navi.bamf.de/en/Themen/Behoerden/",
      location: "Every major city",
    },
    {
      id: 4,
      name: "Verbraucherzentrale",
      category: "Consumer Rights",
      type: "Advisory",
      icon: "globe",
      description: "Consumer protection advice for contracts, scams, and disputes",
      contact: "Find your state centre",
      website: "https://www.verbraucherzentrale.de/beratung",
      location: "Nationwide offices",
    },
    {
      id: 5,
      name: "Rechtsanwaltskammer",
      category: "Legal",
      type: "Directory",
      icon: "scales",
      description: "Find qualified lawyers and legal representation",
      contact: "Search the official register",
      website: "https://bravsearch.bea-brak.de/bravsearch/index.brak",
      location: "All German states",
    },
    {
      id: 6,
      name: "Polizei Emergency",
      category: "Emergency",
      type: "Emergency",
      icon: "phone",
      description: "Emergency police services",
      contact: "110",
      website: "https://polizei.nrw/en/article/emergency-call-110",
      location: "Nationwide",
    },
    {
      id: 7,
      name: "Integration Courses",
      category: "Integration",
      type: "Educational",
      icon: "globe",
      description: "German language and integration courses for immigrants",
      contact: "Local BAMF office / providers",
      website: "https://bamf-navi.bamf.de/en/Themen/Integrationskurse/",
      location: "Available nationwide",
    },
    {
      id: 8,
      name: "Workers Union (DGB)",
      category: "Work",
      type: "Legal Help",
      icon: "phone",
      description: "Support for workplace rights and employment issues",
      contact: "Regional offices / advice centres",
      website: "https://www.dgbrechtsschutz.de/",
      location: "Major cities",
    },
  ];

  const categories = [
    "All",
    "Housing",
    "Student Support",
    "Immigration",
    "Consumer Rights",
    "Legal",
    "Emergency",
    "Integration",
    "Work",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header with Save icon beside the title (same pattern as Topics) */}
        <div className="mb-12">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Local Resources & Contacts
            </h1>
            <SaveForLaterButton className="shrink-0" />
          </div>
          <p className="text-lg text-muted-foreground mt-1">
            Find organizations, hotlines, and services that can help with legal issues
          </p>
        </div>

        {/* Emergency Contacts Banner */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-red-800 mb-4 flex items-center">
            <Icon name="phone" className="w-5 h-5 mr-2" label="Emergency Contacts" />
            Emergency Contacts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-red-700">
            <div>
              <span className="font-semibold">Police Emergency:</span> 110
            </div>
            <div>
              <span className="font-semibold">Fire/Medical:</span> 112
            </div>
            <div>
              <span className="font-semibold">Crisis Hotline:</span> 0800 111 0 111
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <Card
              key={resource.id}
              className="p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Icon name={resource.icon} className="w-5 h-5" label={resource.name} />
                  </div>
                  <div>
                    <Badge variant="outline">{resource.type}</Badge>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                {resource.name}
              </h3>

              <Badge className="mb-3" variant="secondary">
                {resource.category}
              </Badge>

              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {resource.description}
              </p>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Icon name="phone" className="w-4 h-4" />
                  <span>{resource.contact}</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Icon name="pin" className="w-4 h-4" />
                  <span>{resource.location}</span>
                </div>
              </div>

              <a
                href={resource.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="outline" className="w-full rounded-full group">
                  <Icon name="globe" className="w-4 h-4 mr-2" />
                  Visit Website
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </Card>
          ))}
        </div>

        {/* Additional Help Section */}
        <div className="mt-16 text-center bg-slate-50 rounded-3xl p-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Can't Find What You Need?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            These resources are starting points. Many organizations offer multilingual support and can refer you to specialized help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="rounded-full"
              onClick={() =>
                mailto({
                  subject: "Contact from Resources page",
                  body:
                    "Topic (e.g., tenancy, visa, work):\n" +
                    "City:\n" +
                    "Message:\n",
                })
              }
            >
              📧 Contact Us
            </Button>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() =>
                mailto({
                  subject: "Resource suggestion",
                  body:
                    "Name of organization:\n" +
                    "City/Region:\n" +
                    "Website (if any):\n" +
                    "Why it helps students/immigrants:\n",
                })
              }
            >
              🤝 Suggest a Resource
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Resources;