import { Link } from "react-router-dom";
import {
  BookOpen,
  Shield,
  LifeBuoy,
  MapPin,
  HelpCircle,
} from "lucide-react";
import ReportIssueButton from "@/components/ReportIssueButton";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t bg-card/50">
      <div className="container mx-auto px-4 py-12">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
                KR
              </div>
              <span className="font-semibold text-lg">KnowYourRights</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Simple, practical guides for students and immigrants in Germany.
              This site provides general information and is not legal advice.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/topics" className="inline-flex items-center gap-2 hover:underline">
                  <BookOpen className="h-4 w-4" />
                  Topics
                </Link>
              </li>
              <li>
                <Link to="/explainers" className="inline-flex items-center gap-2 hover:underline">
                  <Shield className="h-4 w-4" />
                  Explainers
                </Link>
              </li>
              <li>
                <Link to="/resources" className="inline-flex items-center gap-2 hover:underline">
                  <LifeBuoy className="h-4 w-4" />
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/faq" className="inline-flex items-center gap-2 hover:underline">
                  <HelpCircle className="h-4 w-4" />
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Get help */}
          <div>
            <h4 className="font-semibold mb-3">Get Help</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/resources?section=emergency" className="inline-flex items-center gap-2 hover:underline">
                  <LifeBuoy className="h-4 w-4" />
                  Emergency Contacts
                </Link>
              </li>
              <li>
                <Link to="/resources" className="inline-flex items-center gap-2 hover:underline">
                  <MapPin className="h-4 w-4" />
                  Local Resources
                </Link>
              </li>
              <li>
                <Link to="/faq#ask" className="inline-flex items-center gap-2 hover:underline">
                  <HelpCircle className="h-4 w-4" />
                  Ask a Question
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>© {year} KnowYourRights.</li>
              <li>Information may change and is provided “as is”.</li>
              <li>Always consult a qualified professional for your case.</li>
            </ul>
          </div>
        </div>

        {/* Report Issue callout */}
        <div className="mt-10">
          <div className="rounded-2xl border bg-muted/40 p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              See something wrong? Broken link or inaccurate info — please report it.
            </p>
            <ReportIssueButton />
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {year} KnowYourRights</span>
          <span>Not legal advice • Built for clarity and education</span>
        </div>
      </div>
    </footer>
  );
}