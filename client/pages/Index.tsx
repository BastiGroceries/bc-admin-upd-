import { useState, useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import Panel from "../components/Panel";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add dark class to document for theme
    document.documentElement.classList.add('dark');

    // Clean up on unmount
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <Panel />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
