// Seção CTA Final com Formulário - Conversão principal
// [ADMIN EDITABLE: Título, campos do formulário, texto do botão]

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { trackConversion, trackCTAClick } from "@/utils/analytics";
import { openWhatsApp } from "@/utils/whatsapp";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function CTAFormSection() {
  useScrollReveal();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    consumption: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Track conversion
    trackConversion("form_submission", 1);
    trackCTAClick("Quero Começar a Economizar", "CTA Form");

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "🎉 Cadastro realizado com sucesso!",
        description: "Em breve nossa equipe entrará em contato para finalizar seu plano de economia.",
      });
      
      // After successful submission, offer WhatsApp contact
      setTimeout(() => {
        const shouldOpenWhatsApp = window.confirm(
          "Quer falar agora mesmo com um especialista via WhatsApp?"
        );
        if (shouldOpenWhatsApp) {
          openWhatsApp(
            `Olá! Acabei de me cadastrar no site. Meu nome é ${formData.name} e gostaria de saber mais sobre os planos de energia compartilhada.`,
            "Formulário CTA"
          );
        }
      }, 1000);
      
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        consumption: ""
      });
    }, 2000);
  };

  const handleWhatsAppClick = () => {
    trackCTAClick("Falar via WhatsApp", "CTA Form");
    openWhatsApp(
      "Olá! Vi o site da Energee e gostaria de falar com um especialista sobre energia compartilhada.",
      "CTA Form Section"
    );
  };

  return (
    <section id="formulario" className="py-20 gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 25% 25%, white 2px, transparent 2px)",
          backgroundSize: "60px 60px"
        }} />
      </div>

      <div className="container-xl px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-white scroll-reveal">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Comece a <span className="text-secondary-light">economizar</span> hoje mesmo!
            </h2>
            <p className="text-xl mb-8 text-white/90 leading-relaxed">
              Preencha o formulário ao lado e nossa equipe de especialistas 
              entrará em contato para criar seu plano personalizado de economia 
              com energia solar compartilhada.
            </p>

            {/* WhatsApp CTA */}
            <div className="mb-8">
              <Button 
                variant="white" 
                size="lg" 
                className="mr-4 mb-4"
                onClick={handleWhatsAppClick}
              >
                💬 Falar via WhatsApp
              </Button>
              <Button 
               variant="white" 
                size="lg" 
                className="mr-4 mb-4"
                onClick={() => window.open('mailto:contato@energee.org.br', '_blank')}
              >
                📧 Enviar E-mail
              </Button>
            </div>

            {/* Benefits List */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-secondary-light/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-sm font-bold text-secondary-light">✓</span>
                </div>
                <span className="text-lg">Simulação gratuita personalizada</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-secondary-light/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-sm font-bold text-secondary-light">✓</span>
                </div>
                <span className="text-lg">Sem compromisso ou taxa de adesão</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-secondary-light/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-sm font-bold text-secondary-light">✓</span>
                </div>
                <span className="text-lg">Atendimento especializado</span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-0 scroll-reveal animate-slide-in-right">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-bold text-foreground mb-2">
                💰 Calcule sua Economia
              </CardTitle>
              <p className="text-muted-foreground">
                Preencha os dados abaixo para receber uma simulação personalizada
              </p>
              <div className="inline-flex items-center bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mt-4">
                <span>🎁</span>
                <span className="ml-2">Simulação 100% Gratuita</span>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-foreground font-medium">
                    Nome Completo *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Digite seu nome completo"
                    required
                    className="mt-2 h-12 bg-white border-border focus:border-primary"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-foreground font-medium">
                    E-mail *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Digite seu melhor e-mail"
                    required
                    className="mt-2 h-12 bg-white border-border focus:border-primary"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-foreground font-medium">
                    Telefone/WhatsApp *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(11) 99999-9999"
                    required
                    className="mt-2 h-12 bg-white border-border focus:border-primary"
                  />
                </div>

                <div>
                  <Label htmlFor="city" className="text-foreground font-medium">
                    Cidade *
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Digite sua cidade"
                    required
                    className="mt-2 h-12 bg-white border-border focus:border-primary"
                  />
                </div>

                <div>
                  <Label htmlFor="consumption" className="text-foreground font-medium">
                    Valor da conta de luz (opcional)
                  </Label>
                  <Input
                    id="consumption"
                    name="consumption"
                    value={formData.consumption}
                    onChange={handleInputChange}
                    placeholder="Ex: R$ 300,00"
                    className="mt-2 h-12 bg-white border-border focus:border-primary"
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="cta" 
                  size="xl" 
                  className="w-full mt-8 animate-pulse-glow"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "⏳ Enviando..." : "🚀 Quero Começar a Economizar"}
                </Button>

                <p className="text-sm text-muted-foreground text-center mt-4">
                  Ao enviar, você concorda com nossos{" "}
                  <a href="/politicas" className="text-primary hover:underline">
                    Termos de Uso
                  </a>{" "}
                  e{" "}
                  <a href="/privacidade" className="text-primary hover:underline">
                    Política de Privacidade
                  </a>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}