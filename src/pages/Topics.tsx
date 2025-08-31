import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Topics = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const topics = [
    {
      id: 1,
      title: "When Police Stop You",
      category: "Police",
      icon: "👮",
      summary: "Know your rights during police encounters",
      points: [
        "You must show ID when asked",
        "You don't have to answer questions without a lawyer",
        "Police need reasonable suspicion to search you",
        "You can remain silent beyond identifying yourself"
      ]
    },
    {
      id: 2,
      title: "Rental Contract Basics",
      category: "Housing",
      icon: "🏠",
      summary: "Understanding your tenant rights and obligations",
      points: [
        "Landlord cannot enter without 24-48h notice",
        "Deposit (Kaution) cannot exceed 3 months rent",
        "You have rights to minor modifications",
        "Termination requires proper notice periods"
      ]
    },
    {
      id: 3,
      title: "Student Work Rights",
      category: "Work",
      icon: "💼",
      summary: "Employment rules for international students",
      points: [
        "EU students: No work restrictions",
        "Non-EU: 120 full days or 240 half days per year",
        "Working more requires employment office approval",
        "University jobs (HiWi) don't count toward limit"
      ]
    },
    {
      id: 4,
      title: "Health Insurance Guide",
      category: "Health",
      icon: "🏥",
      summary: "Mandatory health coverage in Germany",
      points: [
        "Health insurance is legally required",
        "Students under 30: ~110€/month public insurance",
        "Over 30: May need private insurance",
        "EU students can use EHIC card temporarily"
      ]
    }
  ];

  const filteredTopics = category 
    ? topics.filter(topic => topic.category.toLowerCase() === category.toLowerCase())
    : topics;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Topics` : "All Topics"}
          </h1>
          <p className="text-lg text-muted-foreground">
            Simple explanations of your legal rights and obligations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTopics.map((topic) => (
            <Card key={topic.id} className="p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-200">
              <div className="flex items-start space-x-4 mb-4">
                <div className="text-2xl">{topic.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-foreground">{topic.title}</h3>
                    <Badge variant="secondary">{topic.category}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{topic.summary}</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-6">
                {topic.points.map((point, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-foreground">{point}</span>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full rounded-full">
                Read Full Guide
              </Button>
            </Card>
          ))}
        </div>

        {filteredTopics.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No topics found for this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topics;