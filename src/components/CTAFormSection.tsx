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
import { supabase } from "@/integrations/supabase/client";

export function CTAFormSection() {
  useScrollReveal();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    estado: "",
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

    try {
      // Track conversion
      trackConversion("form_submission", 1);
      trackCTAClick("Quero Começar a Economizar", "CTA Form");

      // Submit form via Supabase function
      const { data, error } = await supabase.functions.invoke('submit-form', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          estado: formData.estado,
          consumption: formData.consumption,
          message: "Lead capturado via formulário CTA"
        }
      });

      if (error) throw error;

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
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        estado: "",
        consumption: ""
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Erro ao enviar formulário",
        description: "Ocorreu um erro. Tente novamente ou entre em contato via WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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

      <div className="container-xl px-2 sm:px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-white scroll-reveal mb-8 lg:mb-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
              Comece a <span className="text-secondary-light">economizar</span> hoje mesmo!
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-white/90 leading-relaxed">
              Preencha o formulário ao lado e nossa equipe de especialistas 
              entrará em contato para criar seu plano personalizado de economia 
              com energia solar compartilhada.
            </p>

            {/* WhatsApp CTA */}
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button 
                  variant="white" 
                  size="lg" 
                  className="w-full sm:w-auto"
                  onClick={handleWhatsAppClick}
                >
                  💬 Falar via WhatsApp
                </Button>
                <Button 
                  variant="white" 
                  size="lg" 
                  className="w-full sm:w-auto"
                  onClick={() => window.open('mailto:contato@energee.org.br', '_blank')}
                >
                  📧 Enviar E-mail
                </Button>
              </div>
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
          <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-0 scroll-reveal animate-slide-in-right w-full max-w-lg mx-auto lg:max-w-none">
            <CardHeader className="text-center pb-4 sm:pb-6 px-4 sm:px-6">
              <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2">
                💰 Calcule sua Economia
              </CardTitle>
              <p className="text-sm sm:text-base text-muted-foreground">
                Preencha os dados abaixo para receber uma simulação personalizada
              </p>
              <div className="inline-flex items-center bg-success/10 text-success px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mt-3 sm:mt-4">
                <span>🎁</span>
                <span className="ml-2">Simulação 100% Gratuita</span>
              </div>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
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
                    className="mt-1 sm:mt-2 h-10 sm:h-12 bg-white border-border focus:border-primary text-sm sm:text-base"
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
                    className="mt-1 sm:mt-2 h-10 sm:h-12 bg-white border-border focus:border-primary text-sm sm:text-base"
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
                    className="mt-1 sm:mt-2 h-10 sm:h-12 bg-white border-border focus:border-primary text-sm sm:text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="estado" className="text-foreground font-medium">
                    Estado *
                  </Label>
                  <Input
                    id="estado"
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                    placeholder="Digite seu estado"
                    required
                    className="mt-1 sm:mt-2 h-10 sm:h-12 bg-white border-border focus:border-primary text-sm sm:text-base"
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
                    className="mt-1 sm:mt-2 h-10 sm:h-12 bg-white border-border focus:border-primary text-sm sm:text-base"
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="cta" 
                  size="xl" 
                  className="w-full mt-6 sm:mt-8 animate-pulse-glow h-12 sm:h-14 text-sm sm:text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "⏳ Enviando..." : "🚀 Quero Começar a Economizar"}
                </Button>

                <p className="text-xs sm:text-sm text-muted-foreground text-center mt-3 sm:mt-4">
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