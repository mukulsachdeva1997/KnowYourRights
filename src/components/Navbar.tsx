import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ReportIssueButton from "@/components/ReportIssueButton";
import { Bookmark } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/topics", label: "Topics" },
    { path: "/faq", label: "FAQ" },
    { path: "/explainers", label: "Explainers" },
    { path: "/resources", label: "Resources" },
  ];

  return (
    <nav className="sticky top-0 bg-card shadow-md px-4 py-3 z-50 border-b">
      <div className="container mx-auto flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">KR</span>
          </div>
          <span className="font-semibold text-lg text-foreground">KnowYourRights</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.path
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Bookmarks list (noun) */}
          <Button variant="outline" className="rounded-xl hidden sm:inline-flex" asChild>
            <Link to="/saved" title="Bookmarks">
              <Bookmark className="w-4 h-4 mr-2" />
              Bookmarks
            </Link>
          </Button>

          {/* Report an issue (mailto) */}
          <ReportIssueButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;