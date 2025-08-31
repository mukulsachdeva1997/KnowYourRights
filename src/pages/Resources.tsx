import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Phone, FileText, MapPin, Globe } from "lucide-react";

const Resources = () => {
  const resources = [
    {
      id: 1,
      name: "Mieterbund (Tenant Union)",
      category: "Housing",
      type: "Legal Help",
      icon: <Phone className="w-5 h-5" />,
      description: "Get legal help for tenant disputes and rental issues",
      contact: "+49 30 226 26 0",
      website: "https://mieterbund.de",
      location: "Available nationwide"
    },
    {
      id: 2,
      name: "Studierendenwerk",
      category: "Student Support",
      type: "Advisory",
      icon: <FileText className="w-5 h-5" />,
      description: "Support services for university students including legal advice",
      contact: "Varies by location",
      website: "https://studentenwerke.de",
      location: "At every university"
    },
    {
      id: 3,
      name: "Ausländerbehörde",
      category: "Immigration",
      type: "Government",
      icon: <MapPin className="w-5 h-5" />,
      description: "Immigration office for visa, residence permit applications",
      contact: "Local office",
      website: "Varies by city",
      location: "Every major city"
    },
    {
      id: 4,
      name: "Verbraucherzentrale",
      category: "Consumer Rights",
      type: "Advisory",
      icon: <Globe className="w-5 h-5" />,
      description: "Consumer protection advice for contracts, scams, and disputes",
      contact: "0211 3809-0",
      website: "https://verbraucherzentrale.de",
      location: "Nationwide offices"
    },
    {
      id: 5,
      name: "Rechtsanwaltskammer",
      category: "Legal",
      type: "Directory",
      icon: <FileText className="w-5 h-5" />,
      description: "Find qualified lawyers and legal representation",
      contact: "Varies by state",
      website: "https://brak.de",
      location: "All German states"
    },
    {
      id: 6,
      name: "Polizei Emergency",
      category: "Emergency",
      type: "Emergency",
      icon: <Phone className="w-5 h-5" />,
      description: "Emergency police services",
      contact: "110",
      website: "polizei.de",
      location: "Nationwide"
    },
    {
      id: 7,
      name: "Integration Courses",
      category: "Integration",
      type: "Educational",
      icon: <Globe className="w-5 h-5" />,
      description: "German language and integration courses for immigrants",
      contact: "Local BAMF office",
      website: "https://bamf.de",
      location: "Available nationwide"
    },
    {
      id: 8,
      name: "Workers Union (DGB)",
      category: "Work",
      type: "Legal Help",
      icon: <FileText className="w-5 h-5" />,
      description: "Support for workplace rights and employment issues",
      contact: "030 24060-0",
      website: "https://dgb.de",
      location: "Major cities"
    }
  ];

  const categories = ["All", "Housing", "Student Support", "Immigration", "Consumer Rights", "Legal", "Emergency", "Integration", "Work"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Local Resources & Contacts
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find organizations, hotlines, and services that can help with legal issues
          </p>
        </div>

        {/* Emergency Contacts Banner */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-red-800 mb-4 flex items-center">
            <Phone className="w-5 h-5 mr-2" />
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
            <Card key={resource.id} className="p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {resource.icon}
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
                  <Phone className="w-4 h-4" />
                  <span>{resource.contact}</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{resource.location}</span>
                </div>
              </div>

              <Button variant="outline" className="w-full rounded-full group">
                <Globe className="w-4 h-4 mr-2" />
                Visit Website
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
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
            <Button className="rounded-full">
              📧 Contact Us
            </Button>
            <Button variant="outline" className="rounded-full">
              🤝 Suggest a Resource
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;