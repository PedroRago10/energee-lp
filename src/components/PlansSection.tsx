// Seção de Planos - Tabela/Cards com faixas de economia
// [ADMIN EDITABLE: Planos, preços, percentuais de economia]

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import { trackCTAClick } from "@/utils/analytics";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function PlansSection() {
  useScrollReveal();

  const handlePlanClick = (planName: string) => {
    trackCTAClick(`Contratar Plano ${planName}`, "Planos");
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSimulateClick = () => {
    trackCTAClick("Simule aqui", "Planos");
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
  };
  const plans = [
    {
      name: "Econômico",
      subtitle: "Ideal para começar",
      percentage: "10%",
      monthlyConsumption: "100-250 kWh",
      estimatedSavings: "R$ 30-75",
      features: [
        "Economia de até 10% na conta",
        "Energia 100% limpa",
        "Sem taxa de adesão",
        "Suporte por email"
      ],
      buttonText: "Contratar Plano",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Eficiente",
      subtitle: "Mais escolhido",
      percentage: "20%",
      monthlyConsumption: "250-500 kWh",
      estimatedSavings: "R$ 125-250",
      features: [
        "Economia de até 20% na conta",
        "Energia 100% limpa",
        "Sem taxa de adesão",
        "Suporte prioritário",
        "Relatórios detalhados"
      ],
      buttonText: "Contratar Plano",
      buttonVariant: "cta" as const,
      popular: true
    },
    {
      name: "Máximo",
      subtitle: "Máxima economia",
      percentage: "30%",
      monthlyConsumption: "500+ kWh",
      estimatedSavings: "R$ 375+",
      features: [
        "Economia de até 30% na conta",
        "Energia 100% limpa",
        "Sem taxa de adesão",
        "Suporte VIP 24/7",
        "Relatórios detalhados",
        "Consultoria energética"
      ],
      buttonText: "Contratar Plano",
      buttonVariant: "hero" as const,
      popular: false
    }
  ];

  return (
    <section id="planos" className="py-20 bg-background">
      <div className="container-xl px-4">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Escolha seu <span className="text-primary">Plano de Economia</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Quanto maior seu consumo, maior sua economia. Escolha o plano ideal 
            para seu perfil e comece a economizar hoje mesmo.
          </p>
          
          {/* Simulator CTA */}
          <div className="inline-flex items-center bg-primary/10 text-primary px-6 py-3 rounded-full font-medium transition-smooth hover:bg-primary/20">
            <span>💡</span>
            <span className="ml-2">Quer saber sua economia exata? </span>
            <button 
              className="ml-2 underline font-semibold hover:no-underline transition-smooth"
              onClick={handleSimulateClick}
            >
              Simule aqui
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`
                relative overflow-hidden border-2 transition-smooth hover:scale-105 scroll-reveal
                ${plan.popular 
                  ? 'border-secondary shadow-glow bg-white animate-pulse-glow' 
                  : 'border-border hover:border-primary/30 gradient-card'
                }
              `}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-secondary text-secondary-foreground text-center py-2 font-semibold">
                  <Star className="inline h-4 w-4 mr-1" />
                  Mais Popular
                </div>
              )}
              
              <CardHeader className={`text-center pb-4 ${plan.popular ? 'pt-12' : 'pt-8'}`}>
                <CardTitle className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </CardTitle>
                <p className="text-muted-foreground mb-4">{plan.subtitle}</p>
                
                <div className="mb-4">
                  <div className="text-5xl font-bold text-primary mb-2">
                    {plan.percentage}
                  </div>
                  <div className="text-lg text-muted-foreground">
                    de economia
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    Consumo: {plan.monthlyConsumption}/mês
                  </div>
                  <div className="text-lg font-semibold text-secondary">
                    Economia: {plan.estimatedSavings}/mês
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-4">
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className="flex-shrink-0 w-5 h-5 bg-success/10 rounded-full flex items-center justify-center mr-3">
                        <Check className="h-3 w-3 text-success" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant={plan.buttonVariant} 
                  className="w-full"
                  size="lg"
                  onClick={() => handlePlanClick(plan.name)}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-8 bg-muted/50 rounded-2xl p-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Sem investimento inicial</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">0</div>
              <div className="text-muted-foreground">Taxa de cancelamento</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">30</div>
              <div className="text-muted-foreground">Dias para começar</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}