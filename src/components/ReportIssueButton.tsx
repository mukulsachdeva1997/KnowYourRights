import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/iconMap";
import { mailto } from "@/lib/mailto";

type Props = { className?: string; };

export default function ReportIssueButton({ className }: Props) {
  function handleClick() {
    const url = window.location.href;
    const title = document.title || "KnowYourRights";
    const selected = (window.getSelection?.()?.toString() || "").trim();
    const snippet = selected ? `Selected text:\r\n${selected.slice(0, 500)}\r\n\r\n` : "";

    mailto({
      subject: "Report an issue",
      body:
        `Page: ${title}\r\nURL: ${url}\r\n\r\n` +
        snippet +
        "What’s wrong (link, law, translation, typo):\r\n\r\n" +
        "Optional contact:\r\n",
    });
  }

  return (
    <Button
      variant="outline"
      className={`rounded-xl ${className || ""}`}
      onClick={handleClick}
      title="Report a problem on this page"
    >
      <Icon name="alert" className="w-4 h-4 mr-2" />
      <span className="hidden sm:inline">Report issue</span>
      <span className="sm:hidden">Report</span>
    </Button>
  );
}