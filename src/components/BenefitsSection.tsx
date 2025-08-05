import { Card, CardContent } from "@/components/ui/card";
import { 
  Wallet, 
  Leaf, 
  Calendar, 
  Wrench, 
  Shield, 
  Zap 
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { trackWhatsAppClick } from "@/utils/analytics";
import { openWhatsApp } from "@/utils/whatsapp";

export function BenefitsSection() {
  useScrollReveal();
  const benefits = [
    {
      title: "Economia Garantida",
      description: "Reduza até 30% na sua conta de luz todo mês com energia limpa e renovável.",
      icon: Wallet,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "100% Sustentável", 
      description: "Contribua para um planeta mais limpo usando energia solar sem poluição.",
      icon: Leaf,
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      title: "Sem Fidelidade",
      description: "Cancele quando quiser, sem multas, sem taxa de cancelamento.",
      icon: Calendar,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Sem Obras",
      description: "Não precisa instalar nada em casa. A energia vem direto na sua conta.",
      icon: Wrench,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Seguro e Confiável",
      description: "Regulamentado pela ANEEL e com garantia de fornecimento constante.",
      icon: Shield,
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      title: "Resultado Imediato",
      description: "Comece a economizar já no primeiro mês após a contratação.",
      icon: Zap,
      color: "text-success", 
      bgColor: "bg-success/10"
    }
  ];


  const handleWhatsAppClick = async () => {
    await trackWhatsAppClick("Falar com Especialista", "Desejo falar com especialista");
    await openWhatsApp(
      "Olá! Gostaria de falar com um especialista sobre energia compartilhada",
      "Falar com Especialista"
    );
  };

  return (
    <section id="beneficios" className="py-20 bg-background">
      <div className="container-xl px-4">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Por que escolher <span className="text-primary">Energia Compartilhada</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Todas as vantagens da energia solar, sem os problemas da instalação tradicional.
            Economia, sustentabilidade e praticidade em um só lugar.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Card 
                key={index}
                className="gradient-card border-0 shadow-lg hover:shadow-glow transition-smooth hover:scale-105 group scroll-reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${benefit.bgColor} mb-6 group-hover:scale-110 transition-smooth`}>
                    <IconComponent className={`h-8 w-8 ${benefit.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-fast">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="gradient-section rounded-2xl p-8 md:p-12 shadow-custom-lg">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pronto para economizar com energia limpa?
            </h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de pessoas que já estão economizando na conta de luz 
              com energia solar compartilhada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-primary text-primary-foreground hover:bg-primary-hover shadow-lg hover:shadow-glow transition-smooth px-8 py-4 rounded-lg font-semibold text-lg"
                onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Simular Minha Economia
              </button>
              <button 
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth px-8 py-4 rounded-lg font-semibold text-lg"
                onClick={handleWhatsAppClick}
              >
                Falar com Especialista
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}