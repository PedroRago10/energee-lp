// Página Principal - Energee.org.br
// Site institucional para captação e educação sobre energia compartilhada
// Estrutura modular preparada para painel administrativo

import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { DifferentialSection } from "@/components/DifferentialSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { WhoCanParticipateSection } from "@/components/WhoCanParticipateSection";
import { PlansSection } from "@/components/PlansSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { CTAFormSection } from "@/components/CTAFormSection";
import { Footer } from "@/components/Footer";
import { useContentData } from "@/hooks/useContentData";

const Index = () => {
  const { isLoading } = useContentData();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header fixo com navegação */}
      <Header />
      
      {/* Seção Hero - Impacto principal */}
      <HeroSection />
      
      {/* Como Funciona - 3 passos */}
      <HowItWorksSection />
      
      {/* Diferencial - Energia de famílias brasileiras */}
      <DifferentialSection />
      
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
