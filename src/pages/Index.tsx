// Página Principal - Energee.org.br
// Site institucional para captação e educação sobre energia compartilhada
// Estrutura modular preparada para painel administrativo

import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { WhoCanParticipateSection } from "@/components/WhoCanParticipateSection";
import { PlansSection } from "@/components/PlansSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { CTAFormSection } from "@/components/CTAFormSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header fixo com navegação */}
      <Header />
      
      {/* Seção Hero - Impacto principal */}
      <HeroSection />
      
      {/* Como Funciona - 3 passos */}
      <HowItWorksSection />
      
      {/* Benefícios - Cards com vantagens */}
      <BenefitsSection />
      
      {/* Quem Pode Participar - Público alvo */}
      <WhoCanParticipateSection />
      
      {/* Planos de Economia - Tabela de preços */}
      <PlansSection />
      
      {/* Depoimentos - Testemunhos de clientes */}
      <TestimonialsSection />
      
      {/* FAQ - Perguntas frequentes */}
      <FAQSection />
      
      {/* CTA Final - Formulário de conversão */}
      <CTAFormSection />
      
      {/* Footer - Links e contatos */}
      <Footer />
    </div>
  );
};

export default Index;
