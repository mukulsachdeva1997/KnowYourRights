import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Trash2, Clock } from "lucide-react";

type Saved = { path: string; title: string; ts: number };
const KEY = "kyr:saved";

function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export default function Saved() {
  const [items, setItems] = useState<Saved[]>([]);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem(KEY) || "[]") as Saved[];
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems([]);
    }
  }, []);

  function remove(path: string) {
    const next = items.filter((i) => i.path !== path);
    setItems(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  function clearAll() {
    setItems([]);
    localStorage.setItem(KEY, JSON.stringify([]));
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Saved pages</h1>
            <p className="text-muted-foreground">Bookmarks stored locally on this device.</p>
          </div>
          {items.length > 0 && (
            <Button variant="outline" className="rounded-full" onClick={clearAll}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear all
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-2xl">
            <div className="text-6xl mb-4">🔖</div>
            <h3 className="text-xl font-semibold mb-2">No saved pages yet</h3>
            <p className="text-muted-foreground">
              Tap <span className="inline-block border rounded-full px-2 py-0.5 text-sm">Save</span> on any page to add it here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((it) => (
              <Card key={it.path} className="p-5 rounded-2xl flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold line-clamp-2">{it.title}</h3>
                    <div className="mt-1 text-xs text-muted-foreground break-all">{it.path}</div>
                    <div className="mt-2 inline-flex items-center text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      Saved {timeAgo(it.ts)}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => remove(it.path)}
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Link to={it.path} className="flex-1">
                    <Button variant="outline" className="w-full rounded-full">
                      Open
                    </Button>
                  </Link>
                  <a href={it.path} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button variant="outline" className="w-full rounded-full">
                      New tab
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}