import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQCardProps {
  question: string;
  answer: string;
  category: string;
  source?: string;
}

const FAQCard = ({ question, answer, category, source }: FAQCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getCategoryColor = (category: string) => {
    const colors = {
      Housing: "bg-blue-100 text-blue-800",
      Work: "bg-green-100 text-green-800",
      Police: "bg-red-100 text-red-800",
      Visa: "bg-purple-100 text-purple-800",
      Health: "bg-pink-100 text-pink-800",
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <Card className="p-4 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-200">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-3 flex-1">
          <Badge className={getCategoryColor(category)}>{category}</Badge>
          <h3 className="font-medium text-foreground pr-2">{question}</h3>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        )}
      </div>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-border space-y-2">
          <p className="text-muted-foreground leading-relaxed">{answer}</p>
          {source && (
            <div>
              <a
                href={source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline"
              >
                View Related Law ↗
              </a>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default FAQCard;