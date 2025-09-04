import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Bookmark } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/topics", label: "Topics" },
    { path: "/faq", label: "FAQ" },
    { path: "/explainers", label: "Explainers" },
    { path: "/resources", label: "Resources" },
    // keep Bookmarks in the mobile menu too (nice to have)
    { path: "/saved", label: "Bookmarks" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b bg-card">
      {/* Top bar */}
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">KR</span>
          </div>
          <span className="font-semibold text-lg text-foreground">KnowYourRights</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.slice(0, 5).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(item.path)
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right side: Bookmarks + Hamburger (no Report button here) */}
        <div className="flex items-center gap-2">
          <Link
            to="/saved"
            className="inline-flex items-center rounded-full border px-3 py-1.5 text-sm hover:bg-muted"
            aria-label="Open bookmarks"
            title="Bookmarks"
          >
            <Bookmark className="h-4 w-4" />
            <span className="ml-2 hidden sm:inline">Bookmarks</span>
          </Link>

          <Button
            variant="outline"
            size="icon"
            className="md:hidden rounded-full"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-2">
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-2 text-sm ${
                      isActive(item.path)
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;