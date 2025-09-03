import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Icon } from "@/lib/iconMap";

interface CategoryCardProps {
  title: string;
  icon?: string;          // lucide key (optional; falls back to "info")
  description: string;
  href: string;
}

const CategoryCard = ({ title, icon, description, href }: CategoryCardProps) => {
  return (
    <Link to={href}>
      <Card className="p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-[1.02] cursor-pointer group">
        <div className="flex items-start space-x-4">
          <Icon name={icon || "info"} className="h-7 w-7 mt-0.5 flex-shrink-0" label={title} />
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm mb-3">
              {description}
            </p>
            <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
              Learn more
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CategoryCard;