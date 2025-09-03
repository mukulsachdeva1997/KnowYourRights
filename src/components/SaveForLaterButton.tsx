import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";

type Saved = { path: string; title: string; ts: number };
const KEY = "kyr:saved";
const LIMIT = 50; // cap to avoid unbounded growth

export default function SaveForLaterButton({ title }: { title?: string }) {
  const loc = useLocation();
  const path = loc.pathname + loc.search + loc.hash;
  const [saved, setSaved] = useState<Saved[]>([]);

  useEffect(() => {
    try {
      setSaved(JSON.parse(localStorage.getItem(KEY) || "[]"));
    } catch {
      setSaved([]);
    }
  }, []);

  const isSaved = useMemo(() => saved.some((s) => s.path === path), [saved, path]);

  function toggle() {
    let next = [...saved];
    if (isSaved) {
      next = next.filter((s) => s.path !== path);
    } else {
      next.unshift({
        path,
        title: (title || document.title || "Saved page").slice(0, 120),
        ts: Date.now(),
      });
      if (next.length > LIMIT) next = next.slice(0, LIMIT);
    }
    setSaved(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  return (
    <Button
      variant="outline"
      className="rounded-xl"
      onClick={toggle}
      title={isSaved ? "Remove bookmark" : "Save for later"}
    >
      {isSaved ? <BookmarkCheck className="w-4 h-4 mr-2" /> : <Bookmark className="w-4 h-4 mr-2" />}
      {isSaved ? "Saved" : "Save"}
    </Button>
  );
}