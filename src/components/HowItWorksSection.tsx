
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Settings, TrendingDown } from "lucide-react";
import howItWorksImage from "@/assets/energy-flow-diagram.jpg";
import { trackCTAClick } from "@/utils/analytics";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useContentData } from "@/hooks/useContentData";

export function HowItWorksSection() {
  useScrollReveal();
  const { getSection } = useContentData();

  const handleCTAClick = () => {
    trackCTAClick("Começar Agora - É Grátis", "Como Funciona");
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
  };

  const howItWorksData = getSection('how_it_works');
  const stepsData = getSection('steps');

  // Default steps fallback
  const defaultSteps = [
    {
      number: "01",
      title: "Calcule sua economia e envie seu consumo",
      description: "Preencha nosso formulário com seus dados e consumo. Selecione sua distribuidora de energia para uma simulação precisa.",
      icon: UserPlus,
      color: "text-primary"
    },
    {
      number: "02", 
      title: "Escolha o Plano e Assine o Termo de Adesão",
      description: "Selecione o plano ideal para seu perfil e assine o termo de adesão digitalmente. Todo o processo é 100% online.",
      icon: Settings,
      color: "text-secondary"
    },
    {
      number: "03",
      title: "Comece a economizar",
      description: "Receba créditos de energia limpa na sua conta de luz em até 30 dias e veja a economia acontecer todo mês.",
      icon: TrendingDown,
      color: "text-success"
    }
  ];

  const stepsContent = stepsData?.content?.steps || []
  const contentSteps = stepsContent?.map((s: any, index: number) => {
    return {
      number: String(index + 1).padStart(2, '0'),
      title: s.title  || '',
      description: s.description || "",
      icon: defaultSteps[index]?.icon || UserPlus,
      color: defaultSteps[index]?.color || "text-primary"
    };
  }).filter(Boolean) || []; 

  const steps = contentSteps.length > 0 ? contentSteps : defaultSteps;
  const sectionTitle = howItWorksData?.content?.title || "";
  const sectionDescription = howItWorksData?.content?.subtitle || "";

  return (
    <section id="como-funciona" className="py-12 sm:py-20 bg-muted/30">
      <div className="container-xl px-2 sm:px-4">
        <div className="text-center mb-12 sm:mb-16 scroll-reveal">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            {sectionTitle.includes("Funciona") ? (
              <>Como <span className="text-primary">Funciona</span> a Energia Compartilhada?</>
            ) : (
              sectionTitle
            )}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            {sectionDescription}
          </p>
        </div>

        {/* Diagram Image */}
        <div className="mb-12 sm:mb-16 flex flex-col items-center scroll-reveal">
          <img 
            src={howItWorksImage} 
            alt="Diagrama explicativo do funcionamento da energia compartilhada"
            className="max-w-full h-auto rounded-lg shadow-lg animate-float mb-4 sm:mb-6"
          />
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 sm:p-6 max-w-2xl text-center">
            <p className="text-sm sm:text-base md:text-lg text-primary font-semibold">
              {howItWorksData?.content?.promo?.title || ''}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              {howItWorksData?.content?.promo?.description || ''}
            </p>
          </div>
        </div>

        <div className="mb-10 sm:mb-8 flex flex-col items-center scroll-reveal">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">Etapas</h2>
        </div>
        {/* Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Card 
                key={index} 
                className="gradient-card border-0 shadow-lg hover:shadow-glow transition-smooth hover:scale-105 scroll-reveal"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className={`inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-${step.color.replace('text-', '')}/10 mb-4 sm:mb-6`}>
                    <IconComponent className={`h-6 sm:h-8 w-6 sm:w-8 ${step.color}`} />
                  </div>
                  
                  <div className={`text-2xl sm:text-3xl md:text-4xl font-bold ${step.color} mb-3 sm:mb-4`}>
                    {step.number}
                  </div>
                  
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-3 sm:mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center scroll-reveal">
          <Button 
            variant="hero" 
            size="lg" 
            className="w-full sm:w-auto max-w-sm mx-auto animate-pulse-glow text-sm sm:text-base"
            onClick={handleCTAClick}
          >
            🚀 Começar Agora - É Grátis
          </Button>
          <p className="text-xs sm:text-sm text-muted-foreground mt-3 sm:mt-4">
            {stepsData?.content?.ctaMessage || ''}
          </p>
        </div>
      </div>
    </section>
  );
}