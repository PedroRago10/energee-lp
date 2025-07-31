// Header Component - Navegação fixa inspirada no Energee.com.br
// [ADMIN EDITABLE: Logo, texto do botão]

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import energeeLogo from "@/assets/logo-energee-blue.png";
import { trackCTAClick } from "@/utils/analytics";
import { openWhatsApp } from "@/utils/whatsapp";
import { useContentData } from "@/hooks/useContentData";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getSection } = useContentData();
  
  const headerData = getSection('header');
  const associationText = headerData?.content?.associationText || 'Associação';
  const navLinks = headerData?.content?.navLinks || ['Como Funciona', 'Planos', 'Depoimentos', 'FAQ', 'Quero Participar'];

  const handleQueroParticipar = () => {
    trackCTAClick(navLinks[4] || "Quero Participar", "Header");
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleNavClick = (target: string, label: string) => {
    trackCTAClick(label, "Header Navigation");
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleFalarEspecialista = () => {
    trackCTAClick("Falar com Especialista", "Header");
    openWhatsApp(
      "Olá! Gostaria de falar com um especialista sobre energia compartilhada.",
      "Header"
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-custom-sm">
      <div className="container-xl px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src={energeeLogo} 
              alt="Energee" 
              className="h-8 w-auto"
            />
            <span className="text-md font-semibold text-primary">{associationText}</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavClick('como-funciona', navLinks[0])}
              className="text-foreground hover:text-primary transition-fast font-medium"
            >
              {navLinks[0]}
            </button>
            <button 
              onClick={() => handleNavClick('planos', navLinks[1])}
              className="text-foreground hover:text-primary transition-fast font-medium"
            >
              {navLinks[1]}
            </button>
            <button 
              onClick={() => handleNavClick('depoimentos', navLinks[2])}
              className="text-foreground hover:text-primary transition-fast font-medium"
            >
              {navLinks[2]}
            </button>
            <button 
              onClick={() => handleNavClick('faq', navLinks[3])}
              className="text-foreground hover:text-primary transition-fast font-medium"
            >
              {navLinks[3]}
            </button>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="cta" 
              size="lg"
              onClick={handleQueroParticipar}
            >
              {navLinks[4]}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => handleNavClick('como-funciona', navLinks[0])}
                className="text-foreground hover:text-primary transition-fast font-medium py-2 text-left"
              >
                {navLinks[0]}
              </button>
              <button 
                onClick={() => handleNavClick('planos', navLinks[1])}
                className="text-foreground hover:text-primary transition-fast font-medium py-2 text-left"
              >
                {navLinks[1]}
              </button>
              <button 
                onClick={() => handleNavClick('depoimentos', navLinks[2])}
                className="text-foreground hover:text-primary transition-fast font-medium py-2 text-left"
              >
                {navLinks[2]}
              </button>
              <button 
                onClick={() => handleNavClick('faq', navLinks[3])}
                className="text-foreground hover:text-primary transition-fast font-medium py-2 text-left"
              >
                {navLinks[3]}
              </button>
              
              {/* Mobile CTAs */}
              <div className="flex flex-col space-y-3 pt-4 border-t border-border">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="justify-center"
                  onClick={handleFalarEspecialista}
                >
                  Falar com Especialista
                </Button>
                <Button 
                  variant="cta" 
                  size="lg"
                  onClick={handleQueroParticipar}
                >
                  {navLinks[4]}
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}