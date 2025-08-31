import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import FAQCard from "@/components/FAQCard";
import { Button } from "@/components/ui/button";
import faqsData from "@/data/faqs.json";

const FAQ = () => {
  const [searchParams] = useSearchParams();
  const [filteredFAQs, setFilteredFAQs] = useState(faqsData);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Housing", "Work", "Police", "Visa", "Health"];

  useEffect(() => {
    const searchFromParams = searchParams.get("search");
    if (searchFromParams) {
      setSearchQuery(searchFromParams);
      handleSearch(searchFromParams);
    }
  }, [searchParams]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    let filtered = faqsData;

    if (query.trim()) {
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(query.toLowerCase()) ||
        faq.answer.toLowerCase().includes(query.toLowerCase()) ||
        faq.keywords.some(keyword => 
          keyword.toLowerCase().includes(query.toLowerCase())
        )
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    setFilteredFAQs(filtered);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    let filtered = faqsData;

    if (searchQuery.trim()) {
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    if (category !== "All") {
      filtered = filtered.filter(faq => faq.category === category);
    }

    setFilteredFAQs(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Quick answers to common legal questions
          </p>
          
          <SearchBar 
            placeholder="Search FAQ..." 
            onSearch={handleSearch}
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => handleCategoryFilter(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''} found
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.map((faq) => (
            <FAQCard
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              category={faq.category}
            />
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🤔</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No questions found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search terms or browse all categories
            </p>
            <Button onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setFilteredFAQs(faqsData);
            }} className="rounded-full">
              Show All Questions
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQ;