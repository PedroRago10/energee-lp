// Seção de Planos - Tabela/Cards com faixas de economia
// [ADMIN EDITABLE: Planos, preços, percentuais de economia]

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import { trackCTAClick } from "@/utils/analytics";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useContentData } from "@/hooks/useContentData";

export function PlansSection() {
  useScrollReveal();
  const { plans, getSection } = useContentData();
  
  const plansData = getSection('plans');
  const sectionTitle = plansData?.content?.title || 'Escolha seu Plano de Economia';
  const sectionSubtitle = plansData?.content?.subtitle || 'Quanto maior seu consumo, maior sua economia. Escolha o plano ideal para seu perfil e comece a economizar hoje mesmo.';
  const infoCards = plansData?.content?.infoCards || [
    { title: '100%', subtitle: 'Sem Investimento' },
    { title: '0', subtitle: 'Taxa de cancelamento' },
    { title: '30', subtitle: 'Dias para começar' }
  ];

  const handlePlanClick = (planName: string) => {
    trackCTAClick(`Contratar Plano ${planName}`, "Planos");
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSimulateClick = () => {
    trackCTAClick("Simule aqui", "Planos");
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="planos" className="py-20 bg-background">
      <div className="container-xl px-4">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {sectionTitle}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {sectionSubtitle}
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
              key={plan.id}
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
                    {plan.percentage}%
                  </div>
                  <div className="text-lg text-muted-foreground">
                    de economia
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    Consumo: {plan.consumption_range}/mês
                  </div>
                  <div className="text-lg font-semibold text-secondary">
                    Economia: {plan.estimated_savings}/mês
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-4">
                <div className="space-y-4 mb-8">
                  {Array.isArray(plan.features) && plan.features.map((feature: string, featureIndex: number) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className="flex-shrink-0 w-5 h-5 bg-success/10 rounded-full flex items-center justify-center mr-3">
                        <Check className="h-3 w-3 text-success" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant={plan.button_variant as any} 
                  className="w-full"
                  size="lg"
                  onClick={() => handlePlanClick(plan.name)}
                >
                  {plan.button_text}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-8 bg-muted/50 rounded-2xl p-8">
            {infoCards.map((info, index) => (
              <div key={index} className="flex items-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{info.title}</div>
                  <div className="text-muted-foreground">{info.subtitle}</div>
                </div>
                {index < infoCards.length - 1 && (
                  <div className="hidden sm:block w-px h-12 bg-border ml-8"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}