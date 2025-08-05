// Hero Section - Seção principal de impacto
// [ADMIN EDITABLE: Título, subtítulo, texto do botão, imagem de fundo]

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-solar-panels.jpg";
import { trackCTAClick } from "@/utils/analytics";
import { openWhatsApp } from "@/utils/whatsapp";
import { useContentData } from "@/hooks/useContentData";

export function HeroSection() {
  const { getSection } = useContentData();
  
  const heroData = getSection('hero');

  const title = heroData?.content?.title || '';
  const description = heroData?.content?.description || '';
  const cards = heroData?.content?.cards || [];

  const handleScrollToCTA = () => {
    trackCTAClick("Saiba Como Funciona", "Hero Section");
    document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSimulateEconomy = () => {
    trackCTAClick("Simular Economia", "Hero Section");
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-xl px-2 sm:px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 animate-fade-in leading-tight">
            {title}
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 text-white/90 max-w-3xl mx-auto animate-slide-up">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-slide-up max-w-lg mx-auto">
            <Button 
              variant="white" 
              size="lg" 
              className="w-full sm:w-auto text-sm sm:text-base animate-pulse-glow"
              onClick={handleScrollToCTA}
            >
              Saiba Como Funciona
            </Button>
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary-hover shadow-lg hover:shadow-glow transition-smooth text-sm sm:text-base"
              onClick={handleSimulateEconomy}
            >
              Simular Economia
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 animate-fade-in">
            {cards.map((card, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-light mb-2">
                  {card.title}
                </div>
                <div className="text-sm sm:text-base md:text-lg text-white/80">
                  {card.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white/60" />
        </div>
      </div>
    </section>
  );
}