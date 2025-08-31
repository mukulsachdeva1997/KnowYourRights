import Navbar from "@/components/Navbar";
import CategoryCard from "@/components/CategoryCard";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";

const Index = () => {
  const categories = [
    {
      title: "Housing",
      icon: "🏠",
      description: "Tenant rights, rental contracts, and housing disputes",
      href: "/topics?category=housing"
    },
    {
      title: "Work",
      icon: "💼", 
      description: "Employment rights, contracts, and workplace issues",
      href: "/topics?category=work"
    },
    {
      title: "Police",
      icon: "👮",
      description: "Your rights when dealing with law enforcement",
      href: "/topics?category=police"
    },
    {
      title: "Visa & Immigration",
      icon: "📄",
      description: "Residence permits, registration, and immigration law",
      href: "/topics?category=visa"
    },
    {
      title: "Health",
      icon: "🏥",
      description: "Health insurance, medical rights, and healthcare access",
      href: "/topics?category=health"
    },
    {
      title: "Education",
      icon: "🎓",
      description: "Student rights, university procedures, and academic issues",
      href: "/topics?category=education"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-hero-gradient py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Understand Your Rights<br />
            <span className="text-blue-100">in Germany</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-50 mb-8 max-w-2xl mx-auto leading-relaxed">
            For students and immigrants — no legal jargon, just simple answers.
          </p>
          <div className="mb-8">
            <SearchBar placeholder="Search legal topics, rights, or situations..." />
          </div>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8 py-3 text-lg font-semibold shadow-lg hover:scale-105 transition-all">
            Start Exploring
          </Button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Browse by Topic
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find quick answers and detailed guides for the most common legal situations
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                title={category.title}
                icon={category.icon}
                description={category.description}
                href={category.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Need Help Right Now?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" className="rounded-full px-8 py-3">
              📞 Emergency Contacts
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 py-3">
              🗺️ Local Resources
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 py-3">
              💬 Ask a Question
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
