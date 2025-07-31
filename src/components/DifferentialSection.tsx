// Seção Diferencial - Destaque para investimento de famílias brasileiras
// [ADMIN EDITABLE: Título, descrição, destaques]

import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Zap } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function DifferentialSection() {
  useScrollReveal();

  const differentials = [
    {
      icon: Heart,
      title: "Investimento de Famílias",
      description: "Nossa energia vem de investimentos de famílias brasileiras, não de grandes corporações",
      color: "text-secondary"
    },
    {
      icon: Users,
      title: "Comunidade Brasileira",
      description: "Unindo famílias, geradores e consumidores em uma rede de energia colaborativa",
      color: "text-primary"
    },
    {
      icon: Zap,
      title: "Energia por Assinatura",
      description: "Modelo inovador que democratiza o acesso à energia solar para todos os brasileiros",
      color: "text-success"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container-xl px-4">
        <div className="text-center mb-16 scroll-reveal">
          <div className="inline-flex items-center bg-secondary/10 text-secondary px-6 py-3 rounded-full font-medium mb-6">
            <span>🌱</span>
            <span className="ml-2">Energia Solar por Assinatura</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="text-secondary">Unindo famílias</span>, Geradores e <span className="text-primary">Consumidores Brasileiros</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A energia vem de investimentos de famílias brasileiras, não de grandes corporações. 
            Juntos, criamos uma rede de energia limpa, acessível e sustentável.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {differentials.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card 
                key={index}
                className="gradient-card border-0 shadow-lg hover:shadow-glow transition-smooth hover:scale-105 scroll-reveal"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${item.color.replace('text-', '')}/10 mb-6`}>
                    <IconComponent className={`h-8 w-8 ${item.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {item.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16 scroll-reveal">
          <div className="bg-gradient-hero rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Faça parte desta revolução energética! 🚀
            </h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Junte-se a milhares de famílias brasileiras que já escolheram um futuro mais sustentável e econômico.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}