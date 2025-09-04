// src/components/ReportIssueButton.tsx
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mailto } from "@/lib/mailto";

export default function ReportIssueButton({ className = "" }: { className?: string }) {
  const handleClick = () => {
    const { href, userAgent } = window.navigator
      ? { href: window.location.href, userAgent: window.navigator.userAgent }
      : { href: "", userAgent: "" };

    mailto({
      subject: "Report an issue",
      body:
        `Page: ${href}\r\n` +
        `Describe the problem:\r\n\r\n` +
        `Device/Browser (optional): ${userAgent}`,
    });
  };

  return (
    <>
      {/* Mobile: icon-only */}
      <Button
        variant="outline"
        size="icon"
        onClick={handleClick}
        aria-label="Report issue"
        className={`rounded-full sm:hidden ${className}`}
      >
        <TriangleAlert className="h-5 w-5" aria-hidden="true" />
      </Button>

      {/* ≥ sm: icon + label */}
      <Button
        variant="outline"
        onClick={handleClick}
        className={`hidden sm:inline-flex rounded-full ${className}`}
      >
        <TriangleAlert className="h-4 w-4" aria-hidden="true" />
        <span className="ml-2">Report Issue</span>
      </Button>
    </>
  );
}