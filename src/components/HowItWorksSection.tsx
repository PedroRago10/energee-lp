// Seção Como Funciona - Explicação do processo em 3 passos
// [ADMIN EDITABLE: Título, descrição dos passos, ícones]

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Settings, TrendingDown } from "lucide-react";
import howItWorksImage from "@/assets/how-it-works-improved.jpg";
import { trackCTAClick } from "@/utils/analytics";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function HowItWorksSection() {
  useScrollReveal();

  const handleCTAClick = () => {
    trackCTAClick("Começar Agora - É Grátis", "Como Funciona");
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
  };
  const steps = [
    {
      number: "01",
      title: "Cadastre-se",
      description: "Preencha um formulário simples com seus dados básicos e informações sobre seu consumo de energia elétrica.",
      icon: UserPlus,
      color: "text-primary"
    },
    {
      number: "02", 
      title: "Escolha um Plano",
      description: "Selecione o plano de economia que melhor se adequa ao seu perfil de consumo mensal de energia.",
      icon: Settings,
      color: "text-secondary"
    },
    {
      number: "03",
      title: "Comece a Economizar",
      description: "Receba créditos de energia limpa na sua conta de luz e veja a economia acontecer todo mês, sem obras.",
      icon: TrendingDown,
      color: "text-success"
    }
  ];

  return (
    <section id="como-funciona" className="py-20 bg-muted/30">
      <div className="container-xl px-4">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Como <span className="text-primary">Funciona</span> a Energia Compartilhada?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            É simples, rápido e sem complicação. Em apenas 3 passos você já está economizando 
            com energia solar compartilhada.
          </p>
        </div>

        {/* Diagram Image */}
        <div className="mb-16 flex justify-center scroll-reveal">
          <img 
            src={howItWorksImage} 
            alt="Diagrama explicativo do funcionamento da energia compartilhada"
            className="max-w-full h-auto rounded-lg shadow-lg animate-float"
          />
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
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${step.color.replace('text-', '')}/10 mb-6`}>
                    <IconComponent className={`h-8 w-8 ${step.color}`} />
                  </div>
                  
                  <div className={`text-4xl font-bold ${step.color} mb-4`}>
                    {step.number}
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
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
            size="xl" 
            className="px-12 animate-pulse-glow"
            onClick={handleCTAClick}
          >
            🚀 Começar Agora - É Grátis
          </Button>
          <p className="text-muted-foreground mt-4">
            Sem taxa de adesão • Sem fidelidade • Cancele quando quiser
          </p>
        </div>
      </div>
    </section>
  );
}