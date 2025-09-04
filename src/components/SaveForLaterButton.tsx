// src/components/SaveForLaterButton.tsx
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";

type SavedItem = {
  url: string;
  title: string;
  savedAt: number;
};

const LS_KEY = "kyr:saved";

function readSaved(): SavedItem[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as SavedItem[]) : [];
  } catch {
    return [];
  }
}

function writeSaved(items: SavedItem[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  } catch {
    /* no-op */
  }
}

export default function SaveForLaterButton({
  title,
  className = "",
}: {
  /** Optional: override page title used when saving */
  title?: string;
  className?: string;
}) {
  const url = useMemo(() => {
    // include search so /page?a=1 and /page?a=2 can be saved separately
    const { pathname, search } = window.location;
    return pathname + (search || "");
  }, []);

  const fallbackTitle = typeof document !== "undefined" ? document.title : url;
  const displayTitle = title || fallbackTitle;

  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const saved = savedItems.some((i) => i.url === url);

  useEffect(() => {
    setSavedItems(readSaved());
  }, []);

  function toggle() {
    setSavedItems((prev) => {
      if (prev.some((i) => i.url === url)) {
        const next = prev.filter((i) => i.url !== url);
        writeSaved(next);
        return next;
      }
      const next: SavedItem[] = [
        { url, title: displayTitle, savedAt: Date.now() },
        ...prev.filter((i) => i.url !== url),
      ];
      writeSaved(next);
      return next;
    });
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={toggle}
      aria-label={saved ? "Remove bookmark" : "Save bookmark"}
      title={saved ? "Saved" : "Save"}
      className={`rounded-full ${className}`}
    >
      {saved ? (
        <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Bookmark className="h-4 w-4" aria-hidden="true" />
      )}
    </Button>
  );
}