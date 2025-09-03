import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/lib/iconMap";
import Footer from "@/components/Footer";
import SaveForLaterButton from "@/components/SaveForLaterButton";

const Topics = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const navigate = useNavigate();

  const topics = [
    {
      id: 1,
      title: "When Police Stop You",
      category: "Police",
      icon: "shield",
      summary: "Know your rights during police encounters",
      stories: [
        "Police ask for ID while you're walking home",
        "You're stopped and questioned at the station",
        "You're searched without a clear reason",
        "You're recording an incident and get questioned",
      ],
      explainerTag: "stop-and-search",
    },
    {
      id: 2,
      title: "Rental Contract Basics",
      category: "Housing",
      icon: "door-open",
      summary: "Understand your rights as a tenant in Germany",
      stories: [
        "Landlord enters without your permission",
        "You’re being charged more than 3 months' deposit",
        "You want to make small repairs but aren’t sure",
        "You’re unsure how to terminate your lease",
      ],
      explainerTag: "rental-rights",
    },
    {
      id: 3,
      title: "Student Work Rights",
      category: "Work",
      icon: "work",
      summary: "Working while studying? Know your legal limits",
      stories: [
        "You exceed 120 full days of work",
        "Your contract includes unpaid trial hours",
        "You’re offered a HiWi job — does it count?",
        "You’re not paid on time or at all",
      ],
      explainerTag: "student-work",
    },
    {
      id: 4,
      title: "Health Insurance Guide",
      category: "Health",
      icon: "stethoscope",
      summary: "Get covered and stay protected under German law",
      stories: [
        "You turn 30 and need private coverage",
        "You're unsure how to register for public insurance",
        "You visit the doctor but aren’t sure what’s covered",
        "You’re using EHIC as an EU student",
      ],
      explainerTag: "health-coverage",
    },
    {
      id: 5,
      title: "Registering Your Address",
      category: "Visa & Immigration",
      icon: "calendar",
      summary: "How to register your address (Anmeldung) after moving",
      stories: [
        "You're new to Germany and need to register",
        "You just moved apartments",
        "You don’t have a landlord confirmation yet",
        "You missed the 14-day deadline",
      ],
      explainerTag: "register-address",
    },
    {
      id: 6,
      title: "Extending Your Residence Permit",
      category: "Visa & Immigration",
      icon: "id-card",
      summary: "Stay legally in Germany by renewing your permit",
      stories: [
        "Your residence permit is about to expire",
        "You’re unsure which documents are required",
        "You haven’t received an appointment yet",
        "You need a Fiktionsbescheinigung",
      ],
      explainerTag: "residence-permit",
    },
    {
      id: 7,
      title: "Changing Universities in Germany",
      category: "Education",
      icon: "book",
      summary: "Switching schools and updating your student status",
      stories: [
        "You want to transfer to a different university",
        "You're confused about Exmatrikulation",
        "You're worried about how it affects your visa",
        "You want to transfer course credits",
      ],
      explainerTag: "changing-university",
    },
  ];

  const filteredTopics = category
    ? topics.filter((topic) => topic.category.toLowerCase() === category.toLowerCase())
    : topics;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {category
                ? `${category.charAt(0).toUpperCase() + category.slice(1)} Topics`
                : "All Topics"}
            </h1>
            <p className="text-lg text-muted-foreground mt-1">
              Find story-based entry points to your legal rights in Germany
            </p>
          </div>
          <div className="hidden sm:block">
            <SaveForLaterButton />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTopics.map((topic) => (
            <Card
              key={topic.id}
              className="p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-200"
            >
              <div className="flex items-start space-x-4 mb-4">
                <Icon name={topic.icon} className="h-6 w-6 mt-0.5" label={topic.title} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      {topic.title}
                    </h3>
                    <Badge variant="secondary">{topic.category}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{topic.summary}</p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {topic.stories.map((story, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2 text-sm text-foreground"
                  >
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>{story}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-3 mt-2">
                <Button
                  variant="outline"
                  className="rounded-full text-sm"
                  onClick={() =>
                    navigate(
                      `/explainers?category=${topic.category}&topic=${topic.explainerTag}`
                    )
                  }
                >
                  View Your Rights
                </Button>
                
              </div>
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
      <Footer />
    </div>
  );
};

export default Topics;