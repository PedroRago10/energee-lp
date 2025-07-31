// Seção Quem Pode Participar - Público alvo da energia compartilhada
// [ADMIN EDITABLE: Título, tipos de clientes, descrições]

import { Card, CardContent } from "@/components/ui/card";
import { 
  User, 
  Building, 
  Store, 
  Home, 
  Users, 
  Factory 
} from "lucide-react";

export function WhoCanParticipateSection() {
  const participants = [
    {
      title: "Pessoa Física (CPF)",
      description: "Residências, apartamentos, casas e propriedades rurais com consumo mensal a partir de 100 kWh.",
      icon: User,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Microempreendedor (MEI)",
      description: "MEIs com baixo consumo de energia que querem reduzir custos operacionais.",
      icon: Store,
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      title: "Pequenas Empresas (CNPJ)",
      description: "Comércios, consultórios, escritórios e pequenos negócios com consumo até 500 kWh/mês.",
      icon: Building,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Condomínios",
      description: "Áreas comuns de condomínios residenciais e comerciais que querem economizar.",
      icon: Home,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Cooperativas",
      description: "Cooperativas agrícolas, de crédito e outras associações sem fins lucrativos.",
      icon: Users,
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      title: "Indústrias",
      description: "Pequenas indústrias e empresas de médio porte com alto consumo energético.",
      icon: Factory,
      color: "text-success",
      bgColor: "bg-success/10"
    }
  ];

  return (
    <section className="py-20 gradient-section">
      <div className="container-xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="text-primary">Quem Pode</span> Participar?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A energia compartilhada é para todos! Desde pessoas físicas até empresas, 
            qualquer um pode aproveitar os benefícios da energia solar.
          </p>
        </div>

        {/* Participants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {participants.map((participant, index) => {
            const IconComponent = participant.icon;
            return (
              <Card 
                key={index}
                className="bg-white border-0 shadow-custom-md hover:shadow-custom-lg transition-smooth hover:scale-105 group"
              >
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${participant.bgColor} mb-6 group-hover:scale-110 transition-smooth`}>
                    <IconComponent className={`h-10 w-10 ${participant.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-fast">
                    {participant.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {participant.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-custom-lg text-center">
          <h3 className="text-3xl font-bold text-foreground mb-6">
            Requisitos Básicos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">✓</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Consumo Mínimo</h4>
              <p className="text-muted-foreground">Pelo menos 100 kWh por mês na conta de luz</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-secondary">✓</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Área de Cobertura</h4>
              <p className="text-muted-foreground">Estar na área de cobertura da distribuidora</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-success">✓</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Documentação</h4>
              <p className="text-muted-foreground">CPF/CNPJ e última conta de luz</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}