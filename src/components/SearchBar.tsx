import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchBar = ({ placeholder = "Search for legal topics...", onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/faq?search=${encodeURIComponent(query)}`);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex w-full max-w-lg mx-auto">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="rounded-full bg-slate-100 px-6 py-3 shadow-inner border-0 pr-12 focus:bg-white focus:shadow-card"
        />
        <Button
          onClick={handleSearch}
          size="sm"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-8 h-8 p-0"
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;