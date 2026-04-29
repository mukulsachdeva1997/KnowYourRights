import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import explainerSteps from "@/data/explainerSteps";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalize(text: string): string {
  return text.toLowerCase().trim();
}

function tokenize(text: string): string[] {
  return normalize(text)
    .replace(/[^a-z0-9\\s]/g, " ")
    .split(/\\s+/)
    .filter(Boolean);
}

const SearchBar = ({
  placeholder = "Describe your situation… (e.g. landlord entered without permission)",
  onSearch,
}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const explainerIndex = useMemo(() => {
    return Object.entries(explainerSteps).map(([title, data]) => {
      const searchableText = [
        title,
        ...data.steps.map((step) => `${step.title} ${step.detail}`),
        ...(data.guidance?.map((g) => `${g.title} ${g.detail}`) ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return {
        title,
        slug: slugify(title),
        searchableText,
      };
    });
  }, []);

  const findBestExplainer = (rawQuery: string) => {
    const q = normalize(rawQuery);
    const tokens = tokenize(rawQuery);

    if (!q || tokens.length === 0) return null;

    const scored = explainerIndex.map((item) => {
      let score = 0;

      if (item.title.toLowerCase().includes(q)) score += 20;

      for (const token of tokens) {
        if (item.title.toLowerCase().includes(token)) score += 6;
        if (item.searchableText.includes(token)) score += 2;
      }

      if (
        /landlord|deposit|rent|lease|tenant|apartment|wohnung|kaution/.test(q) &&
        item.title === "Rental Contract Basics"
      ) {
        score += 18;
      }

      if (
        /register|anmeldung|address|burgeramt|wohnungsgeber/.test(q) &&
        item.title === "Registering Your Address"
      ) {
        score += 18;
      }

      if (
        /police|stopped|search|searched|lawyer|detained|filming/.test(q) &&
        item.title === "When the Police Stop You"
      ) {
        score += 18;
      }

      if (
        /student work|work limit|140|280|job|hiwi|internship|employment/.test(q) &&
        item.title === "Student Work Rights"
      ) {
        score += 18;
      }

      if (
        /insurance|ehic|doctor|covered|coverage|public insurance|private insurance/.test(q) &&
        item.title === "Health Insurance Guide"
      ) {
        score += 18;
      }

      if (
        /residence permit|permit|auslanderbehorde|fiktionsbescheinigung|extend visa|renew visa/.test(q) &&
        item.title === "Extending Your Residence Permit"
      ) {
        score += 18;
      }

      if (
        /change university|transfer university|exmatrikulation|credit transfer|admission letter/.test(q) &&
        item.title === "Changing Universities in Germany"
      ) {
        score += 18;
      }

      return { ...item, score };
    });

    scored.sort((a, b) => b.score - a.score);

    const best = scored[0];
    if (!best || best.score < 6) return null;

    return best;
  };

  const handleSearch = () => {
    if (!query.trim()) return;

    if (onSearch) {
      onSearch(query);
      return;
    }

    const bestMatch = findBestExplainer(query);

    if (bestMatch) {
      navigate(`/explainers?topic=${encodeURIComponent(bestMatch.slug)}`);
    } else {
      navigate(`/faq?search=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex w-full max-w-2xl mx-auto">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="rounded-full bg-slate-100 px-6 py-3 shadow-inner border-0 pr-24 focus:bg-white focus:shadow-card"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-muted-foreground bg-white/80 px-2 py-1 rounded-full border">
            <Sparkles className="w-3 h-3" />
            Smart match
          </div>
          <Button
            onClick={handleSearch}
            size="sm"
            className="rounded-full w-8 h-8 p-0"
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;