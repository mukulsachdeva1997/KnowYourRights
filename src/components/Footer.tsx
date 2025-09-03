import { Link } from "react-router-dom";
import { Icon } from "@/lib/iconMap";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t bg-muted/20">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <Icon name="info" className="h-5 w-5" />
              <span>KnowYourRights</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Simple, practical guides for students and immigrants in Germany.
              This site provides general information and is not legal advice.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">Explore</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/topics" className="hover:text-primary flex items-center gap-2">
                  <Icon name="book" className="h-4 w-4" />
                  Topics
                </Link>
              </li>
              <li>
                <Link to="/explainers" className="hover:text-primary flex items-center gap-2">
                  <Icon name="shield" className="h-4 w-4" />
                  Explainers
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-primary flex items-center gap-2">
                  <Icon name="globe" className="h-4 w-4" />
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary flex items-center gap-2">
                  <Icon name="help" className="h-4 w-4" />
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Get help */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">Get Help</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  to="/resources?section=emergency"
                  className="hover:text-primary flex items-center gap-2"
                >
                  <Icon name="phone" className="h-4 w-4" />
                  Emergency Contacts
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-primary flex items-center gap-2">
                  <Icon name="pin" className="h-4 w-4" />
                  Local Resources
                </Link>
              </li>
              <li>
                <Link to="/faq#ask" className="hover:text-primary flex items-center gap-2">
                  <Icon name="help" className="h-4 w-4" />
                  Ask a Question
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal note */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">Legal</h4>
            <p className="mt-3 text-sm text-muted-foreground">
              © {year} KnowYourRights. Information is provided “as is” and may change. 
              Always consult a qualified professional for your specific case.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;