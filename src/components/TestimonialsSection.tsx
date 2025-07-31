// Seção de Depoimentos - Testemunhos de clientes
// [ADMIN EDITABLE: Depoimentos, nomes, fotos, cidades]

import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import customerImage from "@/assets/customer-testimonial.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useContentData } from "@/hooks/useContentData";

export function TestimonialsSection() {
  useScrollReveal();
  const { getSection } = useContentData();

  const testimonialsData = getSection('testimonials');
  
  // Default testimonials fallback
  const defaultTestimonials = [
    {
      name: "Maria Silva",
      location: "São Paulo, SP",
      image: customerImage,
      rating: 5,
      text: "Economizo R$ 180 por mês na conta de luz! O processo foi super fácil e em 30 dias já estava recebendo os créditos. Recomendo para todos!",
      savings: "R$ 180/mês"
    },
    {
      name: "João Santos", 
      location: "Rio de Janeiro, RJ",
      image: customerImage,
      rating: 5,
      text: "Como empresário, a economia na conta de luz faz toda diferença no meu negócio. Já são 8 meses economizando com energia limpa.",
      savings: "R$ 420/mês"
    },
    {
      name: "Ana Costa",
      location: "Belo Horizonte, MG", 
      image: customerImage,
      rating: 5,
      text: "Estava cética no início, mas realmente funciona! Minha conta que era R$ 300 agora vem R$ 210. Energia limpa e economia garantida.",
      savings: "R$ 90/mês"
    }
  ];

  // Get testimonials from content - use existing data or show defaults
  const contentTestimonials = testimonialsData?.content?.testimonials?.filter((t: any) => 
    t && t.location // Show if has at least location
  ).map((t: any, index: number) => {
    // Define specific names and savings based on location
    let name = t.name;
    let savings = t.savings;
    
    if (!name) {
      if (t.location === "Concórdia, SC") {
        name = "João Santos";
      } else if (t.location === "Curitiba, PR") {
        name = "Ana Costa";
      } else {
        name = `Cliente ${index + 1}`;
      }
    }
    
    if (!savings) {
      if (t.location === "Concórdia, SC") {
        savings = "R$ 250/mês";
      } else if (t.location === "Curitiba, PR") {
        savings = "R$ 90/mês";
      } else {
        savings = "Economiza";
      }
    }
    
    return {
      name,
      location: t.location,
      image: t.image || customerImage,
      rating: t.rating || 5,
      text: t.text || (t.name === "Maria Silva" ? 
        "Incrível! Estou economizando muito na conta de luz sem precisar instalar nada. Super recomendo!" :
        t.location === "Concórdia, SC" ?
        "A energia compartilhada mudou nossa vida. Economia real todo mês e ainda ajudamos o meio ambiente." :
        "Excelente serviço de energia solar compartilhada!"
      ),
      savings
    };
  }) || [];

  const testimonials = contentTestimonials.length > 0 ? contentTestimonials : defaultTestimonials;
  const sectionTitle = testimonialsData?.content?.title || testimonialsData?.title || "O que nossos clientes estão falando";
  const sectionDescription = testimonialsData?.content?.subtitle || testimonialsData?.description || "Veja os depoimentos reais de quem já está economizando com energia solar compartilhada";

  return (
    <section id="depoimentos" className="py-20 gradient-section">
      <div className="container-xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {sectionTitle.includes("clientes") ? (
              <>O que nossos <span className="text-primary">clientes</span> dizem?</>
            ) : (
              sectionTitle
            )}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {sectionDescription}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="bg-white border-0 shadow-custom-md hover:shadow-custom-lg transition-smooth hover:scale-105"
            >
              <CardContent className="p-8">
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-muted-foreground italic mb-6 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>

                {/* Customer Info */}
                <div className="flex items-center">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </div>
                  </div>
                </div>

                {/* Savings Badge */}
                <div className="mt-4 inline-flex items-center bg-success/10 text-success px-3 py-1 rounded-full text-sm font-semibold">
                  💰 Economiza {testimonial.savings}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-white rounded-2xl p-8 shadow-custom-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">5.000+</div>
              <div className="text-muted-foreground">Clientes Ativos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">R$ 2.5M</div>
              <div className="text-muted-foreground">Economizado por Mês</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success mb-2">4.9/5</div>
              <div className="text-muted-foreground">Avaliação Média</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Recomendam</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}