import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import FAQCard from "@/components/FAQCard";
import { Button } from "@/components/ui/button";
import faqsData from "@/data/faqs.json";
import Footer from "@/components/Footer";
import AskQuestionForm from "@/components/AskQuestionForm";
import SaveForLaterButton from "@/components/SaveForLaterButton";

const FAQ = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [filteredFAQs, setFilteredFAQs] = useState(faqsData);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Housing", "Work", "Police", "Visa", "Health"];

  // support deep-linking: /faq#ask
  useEffect(() => {
    if (location.hash === "#ask") {
      // wait a tick so layout is painted before scrolling
      setTimeout(() => {
        document.getElementById("ask")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    }
  }, [location]);

  // read ?search= from querystring
  useEffect(() => {
    const searchFromParams = searchParams.get("search");
    if (searchFromParams) {
      setSearchQuery(searchFromParams);
      handleSearch(searchFromParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    let filtered = faqsData as typeof faqsData;

    if (query.trim()) {
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query.toLowerCase()) ||
          faq.answer.toLowerCase().includes(query.toLowerCase()) ||
          faq.keywords.some((keyword: string) =>
            keyword.toLowerCase().includes(query.toLowerCase())
          )
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((faq) => faq.category === selectedCategory);
    }

    setFilteredFAQs(filtered);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    let filtered = faqsData as typeof faqsData;

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.keywords.some((keyword: string) =>
            keyword.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    if (category !== "All") {
      filtered = filtered.filter((faq) => faq.category === category);
    }

    setFilteredFAQs(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header + search */}
        <div className="mb-12">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Frequently Asked Questions
            </h1>
            <SaveForLaterButton className="shrink-0" />
          </div>

          <p className="text-lg text-muted-foreground mt-1">
            Quick answers to common legal questions
          </p>

          {/* Search stays inside the header, but spaced a bit below */}
          <div className="mt-6">
            <SearchBar
              placeholder="Search FAQ..."
              onSearch={handleSearch}
            />
          </div>
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
            {filteredFAQs.length} question{filteredFAQs.length !== 1 ? "s" : ""} found
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
              source={faq.source}
            />
          ))}
        </div>

        {/* Empty state */}
        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🤔</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No questions found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search terms or browse all categories
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setFilteredFAQs(faqsData);
              }}
              className="rounded-full"
            >
              Show All Questions
            </Button>
            
          </div>
          
        )}
      </div>
      {/* Ask a Question */}
        <section id="ask" className="py-12 px-4 bg-slate-50 rounded-2xl mb-10">
          <h2 className="text-2xl font-bold text-foreground text-center mb-2">
            Ask a Question
          </h2>
          <p className="text-muted-foreground text-center mb-6">
            Didn’t find what you needed? Send us your question and we’ll point you to the right guide.
          </p>
          <AskQuestionForm />
        </section>

      <Footer />
    </div>
  );
};

export default FAQ;