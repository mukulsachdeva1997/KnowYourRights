import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/lib/iconMap";
import Footer from "@/components/Footer";
import SaveForLaterButton from "@/components/SaveForLaterButton";
import { displayCategoryLabel, normalizeCategory, topics } from "@/data/topics";

const Topics = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const normalizedParam = categoryParam ? normalizeCategory(categoryParam) : null;
  const navigate = useNavigate();

  // Apply normalized filtering
  const filteredTopics = normalizedParam
    ? topics.filter((t) => normalizeCategory(t.category) === normalizedParam)
    : topics;

  const headingCategory = displayCategoryLabel(normalizedParam);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header with Save icon beside the title (visible on mobile) */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {headingCategory ? `${headingCategory} Topics` : "All Topics"}
            </h1>
            <SaveForLaterButton className="shrink-0" />
          </div>
          <p className="text-lg text-muted-foreground mt-1">
            Find story-based entry points to your legal rights in Germany
          </p>
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
                    navigate(`/explainers?category=${topic.category}&topic=${topic.explainerTag}`)
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
