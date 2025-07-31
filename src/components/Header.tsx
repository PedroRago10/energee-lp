// Header Component - Navegação fixa inspirada no Energee.com.br
// [ADMIN EDITABLE: Logo, texto do botão]

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import energeeLogo from "@/assets/logo-energee-blue.png";
import { trackCTAClick } from "@/utils/analytics";
import { openWhatsApp } from "@/utils/whatsapp";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleQueroParticipar = () => {
    trackCTAClick("Quero Participar", "Header");
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
            <span className="text-lg font-semibold text-primary">Associação</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavClick('como-funciona', 'Como Funciona')}
              className="text-foreground hover:text-primary transition-fast font-medium"
            >
              Como Funciona
            </button>
            <button 
              onClick={() => handleNavClick('planos', 'Planos')}
              className="text-foreground hover:text-primary transition-fast font-medium"
            >
              Planos
            </button>
            <button 
              onClick={() => handleNavClick('depoimentos', 'Depoimentos')}
              className="text-foreground hover:text-primary transition-fast font-medium"
            >
              Depoimentos
            </button>
            <button 
              onClick={() => handleNavClick('faq', 'FAQ')}
              className="text-foreground hover:text-primary transition-fast font-medium"
            >
              FAQ
            </button>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="cta" 
              size="lg"
              onClick={handleQueroParticipar}
            >
              Quero Participar
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
                onClick={() => handleNavClick('como-funciona', 'Como Funciona')}
                className="text-foreground hover:text-primary transition-fast font-medium py-2 text-left"
              >
                Como Funciona
              </button>
              <button 
                onClick={() => handleNavClick('planos', 'Planos')}
                className="text-foreground hover:text-primary transition-fast font-medium py-2 text-left"
              >
                Planos
              </button>
              <button 
                onClick={() => handleNavClick('depoimentos', 'Depoimentos')}
                className="text-foreground hover:text-primary transition-fast font-medium py-2 text-left"
              >
                Depoimentos
              </button>
              <button 
                onClick={() => handleNavClick('faq', 'FAQ')}
                className="text-foreground hover:text-primary transition-fast font-medium py-2 text-left"
              >
                FAQ
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
                  Quero Participar
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}